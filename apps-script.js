/**
 * Google Apps Script to send email alerts only (no Google Sheets logging).
 * 
 * ES5 Compatible Version.
 */

var NOTIFICATION_EMAIL = 'deepinderbrarjandwala@gmail.com'; // Receives lead notifications

function doPost(e) {
  try {
    var parameter = e ? e.parameter : {};
    if (!parameter) {
      parameter = {};
    }
    
    // Send email notification alert
    sendEmailAlert(parameter);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Email sent successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendEmailAlert(params) {
  if (!NOTIFICATION_EMAIL) return;
  
  var name = params.name || 'Anonymous';
  var email = params.email || 'N/A';
  var phone = params.phone || 'N/A';
  var website = params.website || 'N/A';
  var budget = params.budget || 'N/A';
  var goal = params.goal || 'N/A';
  var message = params.message || 'No message provided.';
  
  var subject = '🔥 New Lead Captured: ' + name;
  
  var body = 'Hi Deepinder,\n\n' +
             'You have received a new qualifying lead submission from your portfolio website contact form!\n\n' +
             'Lead Details:\n' +
             '--------------------------------------------------\n' +
             '👤 Name: ' + name + '\n' +
             '📧 Email: ' + email + '\n' +
             '📞 Phone/WhatsApp: ' + phone + '\n' +
             '🌐 Website: ' + website + '\n' +
             '💰 Monthly Budget: ' + budget + '\n' +
             '🎯 Service Goal: ' + goal + '\n\n' +
             '📝 Goals & Message:\n' +
             message + '\n' +
             '--------------------------------------------------\n\n' +
             'Best regards,\n' +
             'Deepinder S. Brar Portfolio Automated Mailer';
  
  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}
