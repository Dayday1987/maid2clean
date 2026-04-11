// ================= CONFIG =================
const SUPABASE_URL = 'https://iyeifutvbcumkrcykbcc.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_KEY_HERE';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ================= NAVBAR =================
async function loadNavbar() {
    const res = await fetch('/components/navbar.html');
    const html = await res.text();

    const container = document.getElementById('navbar');
    if (!container) return;

    container.innerHTML = html;

    const btn = document.getElementById("hamburger-btn");
    const menu = document.getElementById("mobile-menu");

    if (btn && menu) {
        btn.addEventListener("click", () => {
            menu.classList.toggle("hidden");
        });
    }
}

// ================= AUTH =================
async function getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

// ================= BOOKING =================
async function createBooking(data) {
    return await supabase.from('bookings').insert({
        ...data,
        status: 'pending'
    });
}

// ================= ADMIN =================
async function updateBookingStatus(id, status) {
    return await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);
}

// ================= INIT =================
async function initApp() {
    await loadNavbar();
}
document.addEventListener("DOMContentLoaded", initApp);
