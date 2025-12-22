export function updateAccountEmail({ username, email, password, profile, pinCode }) {
  return `
<div dir="rtl" style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 30px;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background-color: #007bff; color: white; text-align: center; padding: 20px;">
      <h2 style="margin: 0;">معلومات Netfix حساب</h2>
    </div>

    <!-- Body -->
    <div style="padding: 30px;">
      <p style="font-size: 16px; color: #333;">
        مرحباً، ${username}<br>
      </p>

      <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin-top: 20px;">
        <p style="margin: 8px 0;"><strong>📧 البريد الإلكتروني:</strong> ${email}</p>
        <p style="margin: 8px 0;"><strong>🔑 كلمة المرور:</strong> ${password}</p>
        <p style="margin: 8px 0;"><strong>👤 اسم البروفايل:</strong> ${profile}</p>
        <p style="margin: 8px 0;"><strong>🔢 رمز PIN الجديد:</strong> ${pinCode}</p>
      </div>

      <p style="font-size: 14px; color: #555; margin-top: 25px;">
        ⚠️ يرجى الاحتفاظ بهذه المعلومات في مكان آمن وعدم مشاركتها مع أي شخص.
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f1f1f1; text-align: center; padding: 15px; font-size: 12px; color: #555;">
      © 2025 Firstore — جميع الحقوق محفوظة
    </div>

  </div>
</div>
`
}

export function newAccountInfoEmail({ username, email, password, profile, pinCode }) {
  return `
<div dir="rtl" style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 30px;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background-color: #007bff; color: white; text-align: center; padding: 20px;">
      <h2 style="margin: 0;">معلومات Netfix حساب الجديدة</h2>
    </div>

    <!-- Body -->
    <div style="padding: 30px;">
      <p style="font-size: 16px; color: #333;">
        مرحباً، ${username}<br><br>
        تم تحديث معلومات حسابك بنجاح. تجد أسفله البيانات الجديدة:
      </p>

      <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin-top: 20px;">
        <p style="margin: 8px 0;"><strong>📧 البريد الإلكتروني:</strong> ${email}</p>
        <p style="margin: 8px 0;"><strong>🔑 كلمة المرور:</strong> ${password}</p>
        <p style="margin: 8px 0;"><strong>👤 اسم البروفايل:</strong> ${profile}</p>
        <p style="margin: 8px 0;"><strong>🔢 رمز PIN الجديد:</strong> ${pinCode}</p>
      </div>

      <p style="font-size: 14px; color: #555; margin-top: 25px;">
        ⚠️ يرجى الاحتفاظ بهذه المعلومات في مكان آمن وعدم مشاركتها مع أي شخص.
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f1f1f1; text-align: center; padding: 15px; font-size: 12px; color: #555;">
      © 2025 Firstore — جميع الحقوق محفوظة
    </div>

  </div>
</div>
`
}

export function subscriptionEmail({ name, paymentUrl }) {
  return `
          <div dir="rtl" style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <!-- Header -->
      <div style="background-color: #007BFF; color: white; text-align: center; padding: 20px;">
        <h1 style="margin: 0; font-size: 24px;">Firstore</h1>
      </div>

      <!-- Body -->
      <div style="padding: 30px; text-align: center;">
        <p style="font-size: 16px; color: #333;">مرحبا , ${name}</p>
        <p style="font-size: 16px; color: #333;">
          لقد انتهى اشتراكك الشهري في خدمتنا, المرجو اعادة الاشتراك للحصول على حساب Netflix جديد
        </p>
        <a href="${paymentUrl}" 
           style="display: inline-block; background-color: #FF6F00; color: white; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-weight: bold; margin-top: 20px;">
          اشتراك
        </a>
        <p style="font-size: 14px; color: #777; margin-top: 30px;">
          يمكنك ايضا استعمال هاذا الرابط للاشتراك<br>
          <a href="${paymentUrl}" style="color: #007bff;">${paymentUrl}</a>
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f1f1f1; text-align: center; padding: 15px; font-size: 12px; color: #555;">
        &copy; 2025 Firstore. All rights reserved.
      </div>
    </div>
  </div>
        `
}