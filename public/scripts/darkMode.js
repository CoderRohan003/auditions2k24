
// Set "light" theme as default
if (!localStorage.theme) {
    localStorage.theme = "dark";
}

if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

function attachEvent(selector, event, fn) {
    const matches = document.querySelectorAll(selector);
    if (matches && matches.length) {
        matches.forEach((elem) => {
            elem.addEventListener(event, () => fn(elem), false);
        });
    }
}

window.onload = function () {
    attachEvent('[data-aw-toggle-menu]', 'click', function (elem) {
        elem.classList.toggle('expanded');
        document.body.classList.toggle('overflow-hidden');
        document.getElementById('header')?.classList.toggle('h-screen');
        document.querySelector('#header nav')?.classList.toggle('hidden');
    });

    attachEvent('[data-aw-toggle-color-scheme]', 'click', function () {
        document.documentElement.classList.toggle('dark');
        localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    });

    attachEvent('[data-aw-social-share]', 'click', function (elem) {
        const network = elem.getAttribute('data-aw-social-share');
        const url = encodeURIComponent(elem.getAttribute('data-aw-url'));
        const text = encodeURIComponent(elem.getAttribute('data-aw-text'));

        let href;
        switch (network) {
            case 'facebook':
                href = `https://www.facebook.com/sharer.php?u=${url}`;
                break;
            case 'twitter':
                href = `https://f.com/intent/tweet?url=${url}&text=${text}`;
                break;
            case 'linkedin':
                href = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
                break;
            case 'whatsapp':
                href = `https://wa.me/?text=${text}%20${url}`;
                break;
            case 'mail':
                href = `mailto:?subject=%22${text}%22&body=${text}%20${url}`;
                break;

            default:
                return;
        }

        const newlink = document.createElement('a');
        newlink.target = '_blank';
        newlink.href = href;
        newlink.click();
    });
};
window.onpageshow = function () {
    const elem = document.querySelector('[data-aw-toggle-menu]');
    if (elem) {
        elem.classList.remove('expanded');
    }
    document.body.classList.remove('overflow-hidden');
    document.getElementById('header')?.classList.remove('h-screen');
    document.querySelector('#header nav')?.classList.add('hidden');
};

const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

const texts = [
    "We",
    "are",
    "hiring",
    "Web Developers",
    "Event Managers",
    "Graphic Designers",
    "Content Writers",
    'Video Editors'
];

const morphTime = 1;
const cooldownTime = 0.55;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();



