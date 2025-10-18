# SkillSwap - Card Swipe Prototype

A beautiful Tinder-like card swipe interface for a skill-sharing platform where people can connect to teach and learn from each other.

## Features

✨ **Tinder-like Card Swipe Interface**
- Smooth drag-and-drop swipe animations
- Visual feedback (green for like, red for pass)
- Button controls for desktop users
- Touch-friendly for mobile devices

🎨 **Beautiful Card Design**
- Avatar with emoji representation
- Verified badge indicator
- Skill compatibility percentage
- Skills to teach (bottom left)
- Skills to learn (bottom right)
- Relevant interest tags
- Location information
- Modern gradient design

📱 **Responsive & Interactive**
- Works on desktop and mobile
- Smooth animations and transitions
- Real-time swipe statistics
- Stack preview of upcoming cards

## How to Use

1. **Open the prototype:**
   - Simply open `skill-swap-prototype.html` in any modern web browser
   - No installation or build process required!

2. **Interact with cards:**
   - **Mouse/Touch Drag**: Click and drag cards left or right
   - **Buttons**: Use ✗ (pass) or ✓ (like) buttons at the bottom
   - Swipe right (✓) to express interest in connecting
   - Swipe left (✗) to pass

3. **View stats:**
   - Track your likes and passes at the bottom of the screen

## Card Elements

Each card displays:
- **Avatar**: Emoji-based visual representation
- **Verified Badge**: Blue checkmark for verified users
- **Name & Location**: User identification
- **Compatibility Score**: Skill match percentage
- **Interest Tags**: Quick overview of interests
- **Can Teach** (Bottom Left): Skills the person can share
- **Wants to Learn** (Bottom Right): Skills they want to acquire

## Sample Profiles

The prototype includes 5 sample profiles with diverse skill combinations:
- Musicians teaching instruments
- Developers teaching coding
- Artists teaching design
- Polyglots teaching languages
- And more!

## Technology Stack

- React 18 (via CDN)
- Pure CSS with modern gradients and animations
- Vanilla JavaScript for swipe mechanics
- No build process required

## Customization

To add your own profiles, edit the `profiles` array in the JavaScript section:

```javascript
const profiles = [
    {
        id: 1,
        name: "Your Name",
        avatar: "🎸",
        location: "Distance",
        verified: true,
        compatibility: 92,
        tags: ["Tag1", "Tag2"],
        teaching: ["Skill1", "Skill2"],
        learning: ["Interest1", "Interest2"]
    }
];
```

## Next Steps for Production

For a production version, consider:
- Backend API integration
- User authentication
- Real profile pictures (with privacy controls)
- Matching algorithm
- Chat functionality
- Profile editing
- Match notifications
- Database integration

---

**Enjoy exploring your SkillSwap prototype! 🚀**
