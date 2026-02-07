# Benevolent Islamic Secondary School

Website for Benevolent Islamic Secondary School featuring a modern carousel hero section.

## Hero Carousel

The hero section now features an automatic carousel that cycles through 5 images every 5 seconds.

### Adding Carousel Images

To add images to the carousel, place 5 image files in the ssets/ folder with the following names:
- hero-1.jpg - First slide (Welcome to Excellence)
- hero-2.jpg - Second slide (Academic Excellence)
- hero-3.jpg - Third slide (Building Character)
- hero-4.jpg - Fourth slide (Student Life)
- hero-5.jpg - Fifth slide (Join Our Community)

Each image will automatically:
- Display at full viewport height (100vh)
- Be centered and cover the entire hero section
- Transition smoothly to the next image (0.8s fade effect)
- Cycle through all 5 images every 5 seconds
- Have a dark overlay applied (40% opacity) for better text readability

### Image Requirements
- **Format:** JPG, PNG, or WebP
- **Recommended Size:** 1920x1080px or larger
- **Aspect Ratio:** Wider than 16:9 recommended for full coverage
- **File Size:** Optimize for web (under 500KB each recommended)

### Carousel Features
- Fully automatic with 5-second intervals
- Smooth fade transitions between slides
- Responsive design (works on all screen sizes)
- Fallback background colors while images load
- Accessible structure with proper ARIA labels
- Text overlays remain readable with dark overlay

### Customizing Carousel Timing

To change the carousel speed, edit script.js line 45:

    setInterval(nextSlide, 5000); // Time in milliseconds (5000 = 5 seconds)

Change 5000 to your desired time in milliseconds:
- 3000 = 3 seconds
- 7000 = 7 seconds
- 10000 = 10 seconds

### Customizing Slide Content

To change the text on each slide, edit the following in index.html (lines 108-153):
- hero-title: Main heading for each slide
- hero-subtitle: Subtitle/tagline for each slide
- The "Apply Now" and "Learn More" buttons are consistent across all slides
