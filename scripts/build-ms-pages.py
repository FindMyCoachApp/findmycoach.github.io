#!/usr/bin/env python3
"""Apply Malay translations and path fixes to ms/ pages."""
from pathlib import Path

MS = Path(__file__).resolve().parent.parent / 'ms'


def fix_brand(html):
    return html.replace('Find My Jurulatih', 'Find My Coach')


def fix_paths(html):
    html = html.replace('href="css/', 'href="../css/')
    html = html.replace('href="js/', 'href="../js/')
    html = html.replace('href="favicon/', 'href="../favicon/')
    html = html.replace('content="favicon/', 'content="../favicon/')
    html = html.replace('href="manifest.json"', 'href="../manifest.json"')
    html = html.replace('href="images/', 'href="../images/')
    html = html.replace('src="images/', 'src="../images/')
    html = html.replace('src="js/', 'src="../js/')
    html = html.replace('href="tos.html"', 'href="../tos.html"')
    html = html.replace('href="cookies.html"', 'href="../cookies.html"')
    return html


def add_lang_switch(html, en_href, ms_href, active='ms'):
    en_active = ' is-active" aria-current="true"' if active == 'en' else '"'
    ms_active = ' is-active" aria-current="true"' if active == 'ms' else '"'
    switch = f'''    <div class="lang-switch" aria-label="Bahasa">
      <a class="lang-switch-link{en_active} href="{en_href}" hreflang="en-MY">EN</a>
      <span class="lang-switch-sep" aria-hidden="true">|</span>
      <a class="lang-switch-link{ms_active} href="{ms_href}" hreflang="ms-MY">BM</a>
    </div>
    '''
    if 'lang-switch' not in html:
        html = html.replace('<button class="mobile-menu-toggle"', switch + '    <button class="mobile-menu-toggle"')
    return html


def add_hreflang_ms(html, ms_url):
    if 'hreflang="ms-MY"' not in html.split('</head>')[0]:
        html = html.replace(
            '<link rel="alternate" hreflang="x-default"',
            f'<link rel="alternate" hreflang="ms-MY" href="{ms_url}">\n  <link rel="alternate" hreflang="x-default"'
        )
    return html


def apply_replacements(html, pairs):
    for old, new in pairs:
        html = html.replace(old, new)
    return html


COMMON_NAV = [
    ('Skip to main content', 'Langkau ke kandungan utama'),
    ('Coaching Made Easy', 'Jurulatih Lebih Mudah'),
    ('>Home<', '>Laman Utama<'),
    ('>About<', '>Tentang<'),
    ('>How It Works<', '>Cara Ia Berfungsi<'),
    ('>For Coaches<', '>Untuk Jurulatih<'),
    ('>FAQ<', '>Soalan Lazim<'),
    ('>Contact<', '>Hubungi<'),
    ('>Join Waitlist<', '>Sertai Senarai Tunggu<'),
    ('aria-label="Toggle menu"', 'aria-label="Togol menu"'),
    ('aria-label="Breadcrumb"', 'aria-label="Jejak navigasi"'),
    ('For Coaches', 'Untuk Jurulatih'),
    ('Join Waitlist', 'Sertai Senarai Tunggu'),
    ('Connecting athletes with trusted coaches in Kuala Lumpur.', 'Menghubungkan atlet dengan jurulatih dipercayai di Kuala Lumpur.'),
    ('EXPLORE', 'TEROKAI'),
    ('CONNECT', 'HUBUNGI'),
    ('LEGAL', 'UNDANG-UNDANG'),
    ('Privacy Policy', 'Dasar Privasi'),
    ('Terms of Service', 'Terma Perkhidmatan'),
    ('Cookie Policy', 'Dasar Kuki'),
]


def build_index():
    idx = fix_brand((MS / 'index.html').read_text())
    idx = apply_replacements(idx, [
        ('What is Find My Coach?', 'Apakah Find My Coach?'),
        ('When will the app launch?', 'Bilakah aplikasi dilancarkan?'),
        ('What sports are supported?', 'Sukan apa yang disokong?'),
        ('Is there a fee to use the app?', 'Adakah terdapat yuran?'),
        ('How do coaches join the platform?', 'Bagaimana jurulatih sertai platform?'),
        ('How do I join the waitlist?', 'Bagaimana saya sertai senarai tunggu?'),
        ('Swimming', 'Renang'),
        ('Tennis', 'Tenis'),
        ('More sports coming', 'Lebih banyak sukan akan datang'),
        ('Padel, basketball, football &amp; more based on demand', 'Padel, bola keranjang, bola sepak &amp; lain-lain mengikut permintaan'),
        ('Early athlete feedback', 'Maklum balas atlet awal'),
        ('"The idea of finding a verified coach in KL without endless WhatsApp groups is exactly what we need."',
         '"Idea mencari jurulatih disahkan di KL tanpa kumpulan WhatsApp yang tidak berkesudahan — itulah yang kami perlukan."'),
        ('— Waitlist member, tennis player', '— Ahli senarai tunggu, pemain tenis'),
        ('"As a badminton coach, 0% commission and owning my calendar sold me immediately."',
         '"Sebagai jurulatih badminton, 0% komisen dan kawalan kalendar saya sendiri — terus meyakinkan saya."'),
        ('— Early coach signup', '— Pendaftaran jurulatih awal'),
        ('"Finally a platform built for Malaysia, not a copy-paste from overseas."',
         '"Akhirnya platform dibina untuk Malaysia, bukan salinan dari luar negara."'),
        ('— Athlete, Kuala Lumpur', '— Atlet, Kuala Lumpur'),
        ('Launch sports on Find My Coach', 'Sukan pelancaran Find My Coach'),
        ('Find My Coach is a Kuala Lumpur sports platform connecting athletes with independent coaches for tennis, badminton, swimming, and more.',
         'Find My Coach ialah platform sukan Kuala Lumpur yang menghubungkan atlet dengan jurulatih bebas untuk tenis, badminton, renang, dan lain-lain.'),
        ('Find My Coach connects athletes with verified sports coaches in Kuala Lumpur for tennis, badminton, swimming, and more.',
         'Find My Coach menghubungkan atlet dengan jurulatih sukan dipercayai di Kuala Lumpur untuk tenis, badminton, renang, dan lain-lain.'),
        ('Find My Coach started from a simple idea: making it easier for athletes in Kuala Lumpur to find trusted, high-quality coaches, while giving coaches the freedom to grow their business on their own terms. Founded by Mikołaj, a passionate tennis and football player, the platform was inspired by his own struggle to find experienced coaches who could truly help athletes reach a high-performance level. Through Find My Coach, he aims to build a strong community of athletes and coaches who share the same ambition of improving, competing, and performing at their highest potential.',
         'Find My Coach bermula daripada idea mudah: memudahkan atlet di Kuala Lumpur mencari jurulatih berkualiti dipercayai, sambil memberi jurulatih kebebasan mengembangkan perniagaan mengikut terma sendiri. Diasaskan oleh Mikołaj, pemain tenis dan bola sepak yang bersemangat, platform ini diilhamkan oleh cabarannya sendiri mencari jurulatih berpengalaman. Melalui Find My Coach, beliau bina komuniti atlet dan jurulatih yang berkongsi cita-cita untuk berkembang, bersaing, dan berprestasi tinggi.'),
        ('Find My Coach is a Kuala Lumpur-based sports platform built to connect athletes with independent coaches through a simple, flexible mobile app. We help athletes find trusted local coaches with transparent reviews and easy booking, while giving coaches the visibility, control, and freedom to manage their coaching business without contracts or commission fees.',
         'Find My Coach ialah platform sukan berasaskan Kuala Lumpur yang menghubungkan atlet dengan jurulatih bebas melalui aplikasi mudah alih. Kami membantu atlet mencari jurulatih tempatan dipercayai dengan ulasan telus dan tempahan mudah, sambil memberi jurulatih visibiliti, kawalan, dan kebebasan tanpa kontrak atau yuran komisen.'),
        ('Find My Coach is designed from the ground up to serve athletes and coaches equally with no commissions, no friction, just better connections.',
         'Find My Coach direka untuk melayani atlet dan jurulatih secara saksama tanpa komisen, tanpa halangan, hanya hubungan yang lebih baik.'),
        ('Find My Coach is a mobile app that connects athletes with professional sports coaches in their area. Whether you\'re looking for tennis, swimming, badminton, or other sports coaching, you can browse profiles, compare rates, read reviews, and book sessions instantly.',
         'Find My Coach ialah aplikasi mudah alih yang menghubungkan atlet dengan jurulatih sukan profesional. Sama ada tenis, renang, badminton, atau sukan lain, anda boleh layari profil, banding kadar, baca ulasan, dan tempah sesi dengan segera.'),
        ('We use essential cookies and optional analytics to improve the site. See our <a href="../cookies.html">Cookie Policy</a>.',
         'Kami menggunakan kuki perlu dan analitik pilihan. Lihat <a href="../cookies.html">Dasar Kuki</a> kami.'),
        ('value="https://www.findmycoach.my/thank-you.html"', 'value="https://www.findmycoach.my/ms/thank-you.html"'),
        ('alt="Find My Coach app interface"', 'alt="Antara muka aplikasi Find My Coach"'),
        ('content="Find My Coach — sports coaching app in Kuala Lumpur, Malaysia"', 'content="Find My Coach — aplikasi kejurulatihan sukan di Kuala Lumpur, Malaysia"'),
        ('content="Find My Coach app for sports coaching in Kuala Lumpur"', 'content="Aplikasi Find My Coach untuk kejurulatihan sukan di Kuala Lumpur"'),
    ])
    (MS / 'index.html').write_text(idx)


def build_coaches():
    c = fix_paths((MS / 'coaches.html').read_text())
    c = c.replace('lang="en-MY"', 'lang="ms-MY"')
    c = add_hreflang_ms(c, 'https://www.findmycoach.my/ms/coaches.html')
    c = add_lang_switch(c, '../coaches.html', 'coaches.html')
    c = apply_replacements(c, COMMON_NAV + [
        ('<title>Become a Sports Coach in KL — 0% Commission | Find My Coach</title>', '<title>Jadi Jurulatih Sukan di KL — 0% Komisen | Find My Coach</title>'),
        ('content="Grow your coaching business in Kuala Lumpur with Find My Coach. Set your rates, get discovered by athletes, 0% commission. Coach membership from RM 30/month."',
         'content="Kembangkan perniagaan kejurulatihan anda di Kuala Lumpur dengan Find My Coach. Tetapkan kadar sendiri, 0% komisen. Keahlian jurulatih dari RM 30/bulan."'),
        ('content="become sports coach Kuala Lumpur, coaching platform Malaysia, tennis coach jobs KL, badminton coach listing, 0 commission coaching app"',
         'content="jadi jurulatih sukan Kuala Lumpur, platform kejurulatihan Malaysia, senarai jurulatih tenis KL, 0 komisen"'),
        ('href="https://www.findmycoach.my/coaches.html"', 'href="https://www.findmycoach.my/ms/coaches.html"'),
        ('content="en_MY"', 'content="ms_MY"'),
        ('content="Become a Sports Coach in KL — 0% Commission"', 'content="Jadi Jurulatih Sukan di KL — 0% Komisen"'),
        ('content="Join Find My Coach as a coach in Kuala Lumpur. 0% commission, set your own rates, get discovered by local athletes."',
         'content="Sertai Find My Coach sebagai jurulatih di Kuala Lumpur. 0% komisen, tetapkan kadar sendiri, ditemui atlet tempatan."'),
        ('content="Become a Sports Coach in KL | Find My Coach"', 'content="Jadi Jurulatih Sukan di KL | Find My Coach"'),
        ('content="0% commission. Set your rates. Get discovered by athletes in Kuala Lumpur."',
         'content="0% komisen. Tetapkan kadar. Ditemui atlet di Kuala Lumpur."'),
        ('Grow your coaching business on your terms.', 'Kembangkan perniagaan kejurulatihan mengikut terma anda.'),
        ('Get discovered by athletes in Kuala Lumpur, manage bookings in one place, and keep 100% of what you earn. No commission. No contracts.',
         'Ditemui atlet di Kuala Lumpur, urus tempahan di satu tempat, dan simpan 100% pendapatan anda. Tiada komisen. Tiada kontrak.'),
        ('Join as a coach', 'Sertai sebagai jurulatih'),
        ('See the app', 'Lihat aplikasi'),
        ('Simple, transparent pricing', 'Harga mudah dan telus'),
        ('Athletes browse and book for free. Coaches pay a flat monthly fee — no hidden cuts from your sessions.',
         'Atlet layari dan tempah percuma. Jurulatih bayar yuran bulanan tetap — tiada potongan tersembunyi.'),
        ('Coach membership', 'Keahlian jurulatih'),
        ('From RM 30<span>/month</span>', 'Dari RM 30<span>/bulan</span>'),
        ('0% commission on bookings', '0% komisen ke atas tempahan'),
        ('Set your own rates &amp; schedule', 'Tetapkan kadar &amp; jadual sendiri'),
        ('Profile, calendar &amp; in-app chat', 'Profil, kalendar &amp; sembang dalam aplikasi'),
        ('Build reputation with reviews', 'Bina reputasi melalui ulasan'),
        ('Launch pricing for early coaches — join the waitlist to lock in your spot.',
         'Harga pelancaran untuk jurulatih awal — sertai senarai tunggu untuk tempah slot.'),
        ('Reserve early access', 'Tempah akses awal'),
        ('How we verify coaches', 'Cara kami sahkan jurulatih'),
        ('Identity &amp; credentials', 'Identiti &amp; kelayakan'),
        ('We review coaching experience, certifications, and background before profiles go live.',
         'Kami semak pengalaman, sijil, dan latar belakang sebelum profil diterbitkan.'),
        ('Community reviews', 'Ulasan komuniti'),
        ('Athletes rate sessions after booking, keeping quality high and transparent for everyone.',
         'Atlet menilai sesi selepas tempahan, mengekalkan kualiti tinggi dan telus.'),
        ('Local focus', 'Fokus tempatan'),
        ('We start in Kuala Lumpur with tennis, badminton, and swimming, then expand based on demand.',
         'Kami bermula di Kuala Lumpur dengan tenis, badminton, dan renang, kemudian mengembang mengikut permintaan.'),
    ])
    (MS / 'coaches.html').write_text(c)


def build_waitlist():
    w = fix_paths((MS / 'waitlist.html').read_text())
    w = w.replace('lang="en-MY"', 'lang="ms-MY"')
    w = add_hreflang_ms(w, 'https://www.findmycoach.my/ms/waitlist.html')
    w = add_lang_switch(w, '../waitlist.html', 'waitlist.html')
    w = apply_replacements(w, COMMON_NAV + [
        ('<title>Join the Waitlist — Early Access to Find My Coach</title>', '<title>Sertai Senarai Tunggu — Akses Awal Find My Coach</title>'),
        ('content="Sign up for early access to Find My Coach in Kuala Lumpur. Athletes and coaches get free premium perks at launch in mid 2026. Takes one minute."',
         'content="Daftar untuk akses awal Find My Coach di Kuala Lumpur. Atlet dan jurulatih dapat faedah premium percuma semasa pelancaran pertengahan 2026."'),
        ('content="Find My Coach waitlist, early access sports app Malaysia, coach signup KL, athlete waitlist Kuala Lumpur"',
         'content="senarai tunggu Find My Coach, aplikasi sukan Malaysia, daftar jurulatih KL"'),
        ('href="https://www.findmycoach.my/waitlist.html"', 'href="https://www.findmycoach.my/ms/waitlist.html"'),
        ('content="en_MY"', 'content="ms_MY"'),
        ('content="Join the Find My Coach Waitlist"', 'content="Sertai Senarai Tunggu Find My Coach"'),
        ('content="Get early access to the sports coaching app launching in Kuala Lumpur. Free premium perks for early members."',
         'content="Dapat akses awal aplikasi kejurulatihan sukan di Kuala Lumpur. Faedah premium percuma untuk ahli awal."'),
        ('content="Early access to sports coaching in Kuala Lumpur. Join now."', 'content="Akses awal kejurulatihan sukan di Kuala Lumpur. Sertai sekarang."'),
        ('Early Access', 'Akses Awal'),
        ('Join the waitlist', 'Sertai senarai tunggu'),
        ("Tell us whether you're an athlete or a coach. After you submit, you'll be redirected to a confirmation page with next steps.",
         'Beritahu sama ada anda atlet atau jurulatih. Selepas hantar, anda akan dialihkan ke halaman pengesahan.'),
        ('Early members get <strong>free premium access</strong> when we launch in mid 2026.',
         'Ahli awal dapat <strong>akses premium percuma</strong> semasa pelancaran pertengahan 2026.'),
        ('title="Find My Coach waitlist form"', 'title="Borang senarai tunggu Find My Coach"'),
        ('Loading…', 'Memuatkan…'),
        ('Already submitted? <a href="thank-you.html">View confirmation page</a>',
         'Sudah hantar? <a href="thank-you.html">Lihat halaman pengesahan</a>'),
    ])
    (MS / 'waitlist.html').write_text(w)


def build_privacy():
    p = fix_paths((MS / 'privacy.html').read_text())
    p = p.replace('lang="en-MY"', 'lang="ms-MY"')
    p = add_hreflang_ms(p, 'https://www.findmycoach.my/ms/privacy.html')
    p = add_lang_switch(p, '../privacy.html', 'privacy.html')
    p = apply_replacements(p, COMMON_NAV + [
        ('<title>Privacy Policy | Find My Coach</title>', '<title>Dasar Privasi | Find My Coach</title>'),
        ('content="How Find My Coach collects, uses, and protects your personal data. Privacy policy for athletes, coaches, and website visitors in Malaysia."',
         'content="Cara Find My Coach mengumpul, menggunakan dan melindungi data peribadi anda di Malaysia."'),
        ('content="Find My Coach privacy policy, data protection Malaysia, sports app privacy"',
         'content="dasar privasi Find My Coach, perlindungan data Malaysia"'),
        ('href="https://www.findmycoach.my/privacy.html"', 'href="https://www.findmycoach.my/ms/privacy.html"'),
        ('content="How Find My Coach handles your personal data in Malaysia."', 'content="Cara Find My Coach mengendalikan data peribadi anda di Malaysia."'),
        ('<h1>Privacy Policy</h1>', '<h1>Dasar Privasi</h1>'),
        ('Last updated: February 01, 2026', 'Kemaskini terakhir: 1 Februari 2026'),
        ('Find My Coach ("we", "us", or "our") operates the website',
         'Find My Coach ("kami") mengendalikan laman web'),
        ('and the Find My Coach mobile application. This page explains how we collect, use, and protect your personal information.',
         'dan aplikasi mudah alih Find My Coach. Halaman ini menerangkan cara kami mengumpul, menggunakan, dan melindungi maklumat peribadi anda.'),
        ('Information we collect', 'Maklumat yang kami kumpul'),
        ('Waitlist &amp; contact details', 'Senarai tunggu &amp; butiran hubungan'),
        ('name, email, phone, and whether you are an athlete or coach when you sign up or contact us.',
         'nama, e-mel, telefon, dan sama ada anda atlet atau jurulatih apabila anda mendaftar atau hubungi kami.'),
        ('Usage data', 'Data penggunaan'),
        ('anonymised analytics about how visitors use our website (only when analytics is enabled and consented to).',
         'analitik tanpa nama tentang cara pelawat menggunakan laman web (hanya apabila analitik diaktifkan dan dipersetujui).'),
        ('App data', 'Data aplikasi'),
        ('when the app launches, profile, booking, and messaging data as described in the full policy.',
         'apabila aplikasi dilancarkan, profil, tempahan, dan data mesej seperti diterangkan dalam dasar penuh.'),
        ('How we use your data', 'Cara kami menggunakan data anda'),
        ('To manage the waitlist and communicate about launch updates.', 'Untuk mengurus senarai tunggu dan berkomunikasi tentang kemas kini pelancaran.'),
        ('To respond to contact form enquiries.', 'Untuk membalas pertanyaan borang hubungan.'),
        ('To improve our website and services (with consent where required).', 'Untuk menambah baik laman web dan perkhidmatan (dengan persetujuan jika diperlukan).'),
        ('To comply with legal obligations in Malaysia.', 'Untuk mematuhi obligasi undang-undang di Malaysia.'),
        ('Sharing &amp; retention', 'Perkongsian &amp; pengekalan'),
        ('We do not sell your personal data. We may share data with service providers (e.g. form hosting, analytics) under strict agreements. We retain data only as long as needed for the purposes above.',
         'Kami tidak menjual data peribadi anda. Kami mungkin berkongsi data dengan penyedia perkhidmatan (contoh: hosting borang, analitik) di bawah perjanjian ketat. Kami mengekalkan data hanya selama diperlukan.'),
        ('Your rights', 'Hak anda'),
        ('You may request access, correction, or deletion of your personal data by emailing',
         'Anda boleh meminta akses, pembetulan, atau pemadaman data peribadi dengan e-mel'),
        ('Cookies', 'Kuki'),
        ('See our', 'Lihat'),
        ('for details on cookies and how to manage them.', 'untuk butiran kuki dan cara menguruskannya.'),
        ('Contact', 'Hubungi'),
        ('For privacy questions, contact us at', 'Untuk soalan privasi, hubungi kami di'),
        ('or write to Find My Coach, Kuala Lumpur, Malaysia.', 'atau tulis kepada Find My Coach, Kuala Lumpur, Malaysia.'),
    ])
    (MS / 'privacy.html').write_text(p)


def build_thank_you():
    t = fix_paths((MS / 'thank-you.html').read_text())
    t = t.replace('lang="en-MY"', 'lang="ms-MY"')
    t = add_lang_switch(t, '../thank-you.html', 'thank-you.html')
    t = apply_replacements(t, COMMON_NAV + [
        ('<title>Thank You — You\'re on the Waitlist | Find My Coach</title>', '<title>Terima Kasih — Anda Dalam Senarai Tunggu | Find My Coach</title>'),
        ('content="You\'re on the Find My Coach waitlist. We\'ll notify you when the app launches in Kuala Lumpur."',
         'content="Anda dalam senarai tunggu Find My Coach. Kami akan maklumkan apabila aplikasi dilancarkan di Kuala Lumpur."'),
        ('href="https://www.findmycoach.my/thank-you.html"', 'href="https://www.findmycoach.my/ms/thank-you.html"'),
        ('<h1>You\'re on the list!</h1>', '<h1>Anda dalam senarai!</h1>'),
        ('Thank you for joining the Find My Coach waitlist. We\'re excited to have you on board!',
         'Terima kasih kerana sertai senarai tunggu Find My Coach. Kami gembira anda bersama kami!'),
        ('What happens next?', 'Apa seterusnya?'),
        ('Check your email', 'Semak e-mel anda'),
        ('We\'ll send you updates and exclusive content as we get closer to launch.',
         'Kami akan hantar kemas kini dan kandungan eksklusif apabila pelancaran semakin hampir.'),
        ('Follow us on social media', 'Ikuti kami di media sosial'),
        ('Stay connected and be the first to know about new features and updates.',
         'Kekal berhubung dan jadi yang pertama tahu tentang ciri dan kemas kini baharu.'),
        ('Enjoy early access perks', 'Nikmati faedah akses awal'),
        ('As an early member, you\'ll get free premium access when we launch in mid 2026.',
         'Sebagai ahli awal, anda akan dapat akses premium percuma semasa pelancaran pertengahan 2026.'),
        ('Back to Home', 'Kembali ke Laman Utama'),
        ('Follow on Instagram', 'Ikuti di Instagram'),
    ])
    (MS / 'thank-you.html').write_text(t)


if __name__ == '__main__':
    build_index()
    build_coaches()
    build_waitlist()
    build_privacy()
    build_thank_you()
    print('All ms/ pages updated.')
