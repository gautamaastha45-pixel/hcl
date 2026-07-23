const fs = require('fs');
const path = require('path');
const standardFooter = `  <footer class="footer" id="site-footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <svg class="logo-svg logo-svg--footer" viewBox="0 0 180 50" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="32" class="logo-text" style="font-family: 'Inter', sans-serif; font-size: 28px; font-weight: 500; letter-spacing: -0.5px;">HCL</text>
            <text x="0" y="46" class="logo-text" style="font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 400; letter-spacing: 2.5px; text-transform: uppercase;">HumanCentric Labs</text>
          </svg>
          <p class="footer__brand-text">
            The operating model for the AI era.
          </p>
        </div>
        <div>
          <h6 class="footer__heading">Platform</h6>
          <ul class="footer__links">
            <li><a href="platform.html#hao" class="footer__link">Highly Adaptable Organization</a></li>
            <li><a href="platform.html#smms" class="footer__link">SMMS™</a></li>
            <li><a href="platform.html#talent-ai" class="footer__link">Talent+AI™</a></li>
            <li><a href="platform.html#human-equivalence" class="footer__link">Human Equivalence™</a></li>
            <li><a href="platform.html#rota" class="footer__link">ROTA™</a></li>
          </ul>
        </div>
        <div>
          <h6 class="footer__heading">Applications</h6>
          <ul class="footer__links">
            <li><a href="applications.html" class="footer__link">For Microsoft Partners</a></li>
            <li><a href="applications.html#coming-soon" class="footer__link">For HR Leaders</a></li>
            <li><a href="applications.html#coming-soon" class="footer__link">For CFOs</a></li>
            <li><a href="applications.html#coming-soon" class="footer__link">For Operations</a></li>
          </ul>
        </div>
        <div>
          <h6 class="footer__heading">Company</h6>
          <ul class="footer__links">
            <li><a href="about.html" class="footer__link">About</a></li>
            <li><a href="pricing.html" class="footer__link">Pricing</a></li>
            <li><a href="resources.html" class="footer__link">Resources</a></li>
            <li><a href="contact.html" class="footer__link">Contact</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span class="footer__copyright">© 2025 HumanCentric Labs. All rights reserved.</span>
        <div class="footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>`;
fs.readdirSync('.').forEach(file => {
  if (file.endsWith('.html')) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/  <footer class="footer"[\s\S]*?<\/footer>/, standardFooter);
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
