window.addEventListener('DOMContentLoaded', () => {
  const greetingDiv = document.getElementById('greeting');
  const now = new Date();
  const hour = now.getHours();

  let greetingText = " Welcome back, Houda 👋";

  if (hour >= 5 && hour < 12) {
    greetingText = "☀️   Good Morning, KATIA !";
  } else if (hour >= 12 && hour < 18) {
    greetingText = "🌞  Good Day, KATIA !";
  } else {
    greetingText = "🌙  Good Evening, KATIA !";
  }

  greetingDiv.textContent = greetingText;
});
