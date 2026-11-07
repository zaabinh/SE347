const snowContainer = document.createElement("div");
snowContainer.className = "snowfall";
snowContainer.setAttribute("aria-hidden", "true");

for (let index = 0; index < 24; index += 1) {
  const snowflake = document.createElement("span");
  const duration = 10 + Math.random() * 12;

  snowflake.className = "snowflake";
  snowflake.textContent = Math.random() > 0.5 ? "❄" : "❅";
  snowflake.style.setProperty("--flake-left", `${Math.random() * 100}%`);
  snowflake.style.setProperty("--flake-size", `${12 + Math.random() * 12}px`);
  snowflake.style.setProperty("--flake-opacity", `${0.35 + Math.random() * 0.55}`);
  snowflake.style.setProperty("--flake-duration", `${duration}s`);
  snowflake.style.setProperty("--flake-delay", `${-Math.random() * duration}s`);
  snowflake.style.setProperty("--flake-drift", `${Math.random() * 100 - 50}px`);
  snowContainer.append(snowflake);
}

document.body.append(snowContainer);
