# Pai Labs Website

A professional, modern website for Pai Labs - a venture studio focused on purposeful AI solutions that create real-world impact.

## Features

- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **High Contrast Design**: Based on your provided color scheme (red, blue, black, white)
- **Smooth Animations**: CSS animations and JavaScript interactions
- **AI-Themed Visual Elements**: Neural network animations and floating elements
- **One-Page Layout**: Smooth scrolling navigation between sections
- **Professional Imagery**: High-quality stock photos from Unsplash
- **Contact Form**: Interactive form with validation
- **SEO Optimized**: Semantic HTML structure

## Sections

1. **Hero/Home**: Eye-catching landing with AI animations
2. **About**: Company overview with statistics
3. **Values**: Core principles with interactive cards
4. **Services**: What Pai Labs offers
5. **Contact**: Contact form and information

## Technologies Used

- HTML5
- CSS3 (Custom properties, Flexbox, Grid, Animations)
- JavaScript (ES6+)
- Bootstrap 5.3.0
- Font Awesome 6.4.0
- Google Fonts (Inter, Space Grotesk)

## Color Scheme

Based on your high-contrast design:
- Primary Red: #FF4444
- Primary Blue: #4444FF
- Black: #000000
- White: #FFFFFF
- Light Gray: #F8F9FA
- Dark Gray: #212529

## File Structure

```
pailabs-website/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## Local Development

1. Clone or download the project files
2. Open `index.html` in a web browser
3. For development with live reload, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using VS Code Live Server extension
   Right-click on index.html → Open with Live Server
   ```

## GitHub Pages Deployment

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to repository Settings → Pages
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Your site will be available at: `https://yourusername.github.io/repository-name`

### Quick Deploy Commands

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Pai Labs website"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/pailabs-website.git

# Push to GitHub
git push -u origin main
```

## Customization

### Logo
The PAI logo is currently text-based in the navigation. To use a custom logo image:
1. Add your logo file to the project
2. Replace the `.navbar-brand` content in `index.html`
3. Update the CSS for `.logo-text` and `.logo-subtitle` if needed

### Content
- Update text content in `index.html`
- Modify company information, services, and contact details
- Replace placeholder email and phone numbers

### Images
- Current images are from Unsplash via direct URLs
- For production, download and host images locally
- Update image sources in `index.html`

### Colors
- Modify CSS custom properties in `:root` section of `styles.css`
- Update the color scheme to match your exact brand colors

### Contact Form
- The form currently shows a success message (demo)
- Integrate with a backend service like:
  - Formspree (https://formspree.io/)
  - Netlify Forms
  - EmailJS (https://www.emailjs.com/)
  - Custom backend API

## Performance Optimizations

- Minified CSS and JavaScript for production
- Optimized images (WebP format recommended)
- CDN links for Bootstrap and Font Awesome
- Lazy loading for images below the fold

## Browser Support

- Chrome (90+)
- Firefox (88+)
- Safari (14+)
- Edge (90+)

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- **Design**: Custom design based on high-contrast color scheme
- **Images**: Unsplash (https://unsplash.com/)
- **Icons**: Font Awesome (https://fontawesome.com/)
- **Fonts**: Google Fonts (https://fonts.google.com/)
- **Framework**: Bootstrap (https://getbootstrap.com/)

---

Built with ❤️ for Pai Labs - Purposeful AI for Real Impact