const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const User = require('./model/user')
const crypto = require('crypto');
require('dotenv').config()

exports.forgotPassword = async (req, res) => {
    const {email} = req.body
    try{
      const user = await User.findOne({email})
      if (!user) return res.status(404).json({ message: "User not found" });

      const resetToken = crypto.randomBytes(32).toString('hex')
      const resetLink = `http://localhost:3000/reset-password/${resetToken}`;


      user.resetToken = resetToken
      user.resetTokenExpire = Date.now() + 1000 * 60 * 15
      await user.save()

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.PASS
        }
      })

      const mailOptions = {
        from: `"Toko Migineishvili" <${process.env.MAIL_USER}>`,
        to: email,
        subject: "Reset your password",
        html: `
          <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; padding: 20px; border-radius: 8px; background-color: #f9f9f9; color: #333;">
            <h2 style="color: #4F46E5;">🔒 Password Reset Request</h2>
            <p>Hello,</p>
            <p>You recently requested to reset your password. Click the button below to proceed:</p>
      
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" 
                 style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; font-weight: bold; border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: background-color 0.3s ease;">
                Reset Password
              </a>
            </div>
      
            <p style="font-size: 14px; color: #555;">⚠️ This link will expire in <strong>15 minutes</strong>.</p>
            <p style="font-size: 13px; color: #888;">If you didn’t request this, you can safely ignore this email.</p>
      
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;" />
            <p style="font-size: 12px; color: #aaa;">Best regards,<br/>Toko Migineishvili Team</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions)
      res.status(200).json({ message: "Reset link sent to your email." });

    }catch(err){
      console.error("Error sending reset link:", err);
      res.status(500).json({message: "error getting token"})
    }
}

exports.resetPassword = async (req, res) => {
    const {token} = req.params
    const {password} = req.body
    try{
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpire: { $gt: Date.now()}
      })
      if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

      const hashedPassword = await bcrypt.hash(password, 10)
      user.password = hashedPassword;
      user.resetToken = undefined
      user.resetTokenExpire = undefined
      await user.save()

      res.status(200).json({ message: "Password updated successfully" })

    }catch(err){
      console.error("Reset error:", err);
      res.status(500).json({ message: "Server error" });
    }
}