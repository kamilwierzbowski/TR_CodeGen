async function generate() {
    const publisher = document.getElementById('publisher').value.toUpperCase();
    const format = document.getElementById('format').value;
    const suffix = document.getElementById('suffix').value.toUpperCase();
    const artist = document.getElementById('artist').value;
    const title = document.getElementById('title').value;

    const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publisher, format, suffix, artist, title })
    });

    const data = await res.json();
    document.getElementById('result').innerText = data.catalogNumber + " saved!";
    document.getElementById('resultAdd').innerText = "BLOOD FOR THE BLOOD GOD! SKULLS FOR THE SKULL THRONE!";
    // Create falling skulls
    createSkulls();
  }
  
  // Simple hash function
  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }
  
  // Skulls animation
  function createSkulls() {
    // Create 30 skulls
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const skull = document.createElement('div');
        skull.className = 'skull';
        skull.innerHTML = '💀';
        
        // Random horizontal position
        const randomX = Math.random() * window.innerWidth;
        skull.style.left = `${randomX}px`;
        
        // Random animation duration between 2-5 seconds
        const duration = 2 + Math.random() * 3;
        skull.style.animationDuration = `${duration}s`;
        
        // Random size between 30px-70px
        const size = 30 + Math.random() * 40;
        skull.style.fontSize = `${size}px`;
        
        // Random rotation
        const rotation = -45 + Math.random() * 90;
        skull.style.transform = `rotate(${rotation}deg)`;
        
        document.body.appendChild(skull);
        
        // Remove skull from DOM after animation completes
        setTimeout(() => {
          skull.remove();
        }, duration * 1000);
      }, i * 100); // Stagger the creation of skulls
    }
  }