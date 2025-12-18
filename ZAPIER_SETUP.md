# Zapier Integration Setup Guide

## Overview
The contact form on your website is now integrated with Zapier webhooks. This allows you to automatically send form submissions to email, Google Sheets, CRM systems, Slack, and hundreds of other apps.

## Step 1: Create a Zapier Account
1. Go to [zapier.com](https://zapier.com) and sign up for a free account
2. Free plan includes 100 tasks/month (perfect for contact forms)

## Step 2: Create a New Zap

### Create Webhook Trigger
1. Click **"Create Zap"** in your Zapier dashboard
2. For the **Trigger**, search for and select **"Webhooks by Zapier"**
3. Choose **"Catch Hook"** as the trigger event
4. Click **Continue**
5. Leave the "Pick off a Child Key" field empty
6. Click **Continue**
7. **Copy the Custom Webhook URL** - it will look like:
   ```
   https://hooks.zapier.com/hooks/catch/12345678/abcdefg/
   ```

### Test the Webhook
1. Open `/home/bo97/obportfolio/js/zapier-form.js`
2. Replace `YOUR_ZAPIER_WEBHOOK_URL_HERE` with your actual webhook URL:
   ```javascript
   const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/12345678/abcdefg/';
   ```
3. Save the file
4. Test your contact form on the website
5. Return to Zapier - you should see "We found a request!" with your test data

## Step 3: Add Actions

### Example 1: Send Email Notification
1. Click the **+** button to add an action
2. Search for and select **"Email by Zapier"**
3. Choose **"Send Outbound Email"**
4. Configure the email:
   - **To**: your email address
   - **Subject**: `New Contact Form Submission from {{name}}`
   - **Body**: 
     ```
     Name: {{name}}
     Email: {{email}}
     Company: {{company}}
     Message: {{message}}
     Timestamp: {{timestamp}}
     ```
5. Test the action
6. Turn on your Zap!

### Example 2: Add to Google Sheets
1. Click the **+** button to add another action
2. Search for **"Google Sheets"**
3. Choose **"Create Spreadsheet Row"**
4. Connect your Google account
5. Select your spreadsheet and worksheet
6. Map the fields:
   - Column A: `{{name}}`
   - Column B: `{{email}}`
   - Column C: `{{company}}`
   - Column D: `{{message}}`
   - Column E: `{{timestamp}}`
7. Test and turn on!

### Example 3: Slack Notification
1. Add action: **"Slack"**
2. Choose **"Send Channel Message"**
3. Connect your Slack workspace
4. Select the channel (e.g., #leads or #contact-form)
5. Customize message:
   ```
   🎯 New Contact Form Submission!
   
   👤 Name: {{name}}
   📧 Email: {{email}}
   🏢 Company: {{company}}
   💬 Message: {{message}}
   ```

## Popular Zapier Integrations

### CRM Systems
- **Salesforce**: Create new lead
- **HubSpot**: Create contact
- **Pipedrive**: Add person and deal
- **ActiveCampaign**: Add/update contact

### Email Marketing
- **Mailchimp**: Add subscriber to list
- **ConvertKit**: Add subscriber
- **Constant Contact**: Create contact

### Project Management
- **Trello**: Create card
- **Asana**: Create task
- **Monday.com**: Create item

### Communication
- **Slack**: Send message
- **Microsoft Teams**: Post message
- **Discord**: Send message

## Form Data Available
Your contact form sends the following data to Zapier:
- `name`: Contact's full name
- `email`: Contact's email address
- `company`: Company name (optional)
- `message`: Message text
- `timestamp`: ISO timestamp of submission
- `source`: "Portfolio Website - Contact Form"

## Security Best Practices
1. **Never commit webhook URLs to Git** - they should be kept private
2. Consider adding **Zapier Digest** to bundle multiple submissions
3. Use **Zapier Filters** to exclude spam or test submissions
4. Enable **Zapier's built-in spam protection**

## Testing
1. Fill out the form on your website
2. Check that:
   - Success message appears
   - Data arrives in Zapier
   - Actions execute (email sent, sheet updated, etc.)
3. Test validation by entering invalid email

## Troubleshooting

### Form shows "Configuration required"
- Make sure you've updated the webhook URL in `zapier-form.js`
- Check that the URL is correct (no typos)

### "Something went wrong" error
- Check browser console for errors (F12)
- Verify webhook URL is still active in Zapier
- Make sure Zap is turned ON

### No data appearing in Zapier
- Check your internet connection
- Verify the webhook URL is correct
- Try testing with Zapier's "Test Trigger" feature

### Receiving duplicate submissions
- This could be a browser issue (double-clicking)
- Consider adding rate limiting in JavaScript

## Advanced Features (Optional)

### Add Honeypot for Spam Prevention
Add this hidden field to the form (bots will fill it):
```html
<input type="text" name="honeypot" style="display:none" tabindex="-1" autocomplete="off">
```

Then in JavaScript, reject if honeypot is filled:
```javascript
if (document.querySelector('[name="honeypot"]').value) {
    return; // Likely spam
}
```

### Add Google reCAPTCHA
1. Get reCAPTCHA keys from Google
2. Add reCAPTCHA to form
3. Validate token before sending to Zapier

## Cost Considerations
- **Free Plan**: 100 tasks/month (1 task = 1 form submission)
- **Starter Plan**: $19.99/month - 750 tasks
- **Professional Plan**: $49/month - 2,000 tasks

For a portfolio contact form, the free plan is usually sufficient.

## Next Steps
1. Set up your Zapier account
2. Create your webhook and update the JavaScript file
3. Test the form thoroughly
4. Configure your desired actions
5. Monitor submissions

## Support
If you need help:
- Zapier Help: https://help.zapier.com
- Test using Zapier's request history
- Check browser console for JavaScript errors

---
**Created**: December 18, 2025
**Integration File**: `/js/zapier-form.js`
