<?php
declare(strict_types=1);

session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'Lax',
]);

require __DIR__ . '/lib/site.php';

$content = ubai_load_content();
$admin = ubai_load_admin();
$page = $_GET['page'] ?? 'home';
$status = '';
$error = '';
$uploadUrl = '';

if ($page === 'admin') {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $action = $_POST['action'] ?? '';

        if ($action === 'login') {
            $username = trim((string) ($_POST['username'] ?? ''));
            $password = (string) ($_POST['password'] ?? '');

            if (ubai_login($admin, $username, $password)) {
                header('Location: ?page=admin');
                exit;
            }

            $error = 'Login fehlgeschlagen.';
        }

        if ($action === 'logout') {
            ubai_logout();
            header('Location: ?page=admin');
            exit;
        }

        if (ubai_is_logged_in() && $action === 'save_content') {
            $content = ubai_content_from_post($_POST, $content);
            if (ubai_save_content($content)) {
                $status = 'Inhalte gespeichert.';
            } else {
                $error = 'Inhalte konnten nicht gespeichert werden. Schreibrechte pruefen.';
            }
        }

        if (ubai_is_logged_in() && $action === 'change_password') {
            $currentPassword = (string) ($_POST['current_password'] ?? '');
            $newPassword = (string) ($_POST['new_password'] ?? '');
            $confirmPassword = (string) ($_POST['confirm_password'] ?? '');

            if (!ubai_login($admin, (string) $admin['username'], $currentPassword)) {
                $error = 'Das aktuelle Passwort stimmt nicht.';
            } elseif ($newPassword === '' || strlen($newPassword) < 8) {
                $error = 'Das neue Passwort muss mindestens 8 Zeichen haben.';
            } elseif (!hash_equals($newPassword, $confirmPassword)) {
                $error = 'Die neuen Passwoerter stimmen nicht ueberein.';
            } else {
                $admin['password_hash'] = ubai_hash_password((string) $admin['username'], $newPassword);
                $admin['must_change_password'] = false;
                if (ubai_save_admin($admin)) {
                    $status = 'Passwort geaendert.';
                } else {
                    $error = 'Passwort konnte nicht gespeichert werden.';
                }
            }
        }

        if (ubai_is_logged_in() && $action === 'upload_asset') {
            $result = ubai_store_uploaded_asset($_FILES['asset_file'] ?? []);
            if (!empty($result['ok'])) {
                $status = $result['message'];
                $uploadUrl = (string) ($result['url'] ?? '');
            } else {
                $error = (string) ($result['message'] ?? 'Upload fehlgeschlagen.');
            }
        }
    }
    ?>
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Admin | UBAI.info</title>
  <link rel="icon" href="assets/favicon.ico">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="admin-shell">
    <section class="panel admin-card">
      <div class="admin-toolbar">
        <div>
          <p class="eyebrow">Admin</p>
          <h1>UBAI Inhalte bearbeiten</h1>
        </div>
        <a class="button button-secondary" href="index.php">Zur Webseite</a>
      </div>
      <?php if ($status !== ''): ?>
        <p class="status-message status-ok"><?= ubai_h($status) ?></p>
      <?php endif; ?>
      <?php if ($error !== ''): ?>
        <p class="status-message status-error"><?= ubai_h($error) ?></p>
      <?php endif; ?>
      <?php if ($uploadUrl !== ''): ?>
        <p class="status-message status-ok">Verwendbare URL: <code><?= ubai_h($uploadUrl) ?></code></p>
      <?php endif; ?>

      <?php if (!ubai_is_logged_in()): ?>
        <form class="admin-form admin-login" method="post">
          <input type="hidden" name="action" value="login">
          <label>Benutzername
            <input type="text" name="username" value="admin" autocomplete="username">
          </label>
          <label>Passwort
            <input type="password" name="password" autocomplete="current-password">
          </label>
          <button class="button button-primary" type="submit">Anmelden</button>
        </form>
        <p class="admin-note">Initial: Benutzer `admin`, Passwort `ubai-2026-admin`. Danach bitte sofort &auml;ndern.</p>
      <?php else: ?>
        <?php if (!empty($admin['must_change_password'])): ?>
          <p class="admin-note">Das Initial-Passwort ist noch aktiv. Bitte jetzt sofort ein neues Passwort setzen.</p>
        <?php endif; ?>

        <section class="admin-password">
          <h2>Bild hochladen</h2>
          <form class="admin-form" method="post" enctype="multipart/form-data">
            <input type="hidden" name="action" value="upload_asset">
            <div class="admin-grid">
              <label>Datei
                <input type="file" name="asset_file" accept=".jpg,.jpeg,.png,.gif,.webp,.svg,image/*">
              </label>
            </div>
            <button class="button button-secondary" type="submit">Nach assets hochladen</button>
          </form>
        </section>

        <form class="admin-form" method="post">
          <input type="hidden" name="action" value="save_content">
          <div class="admin-grid">
            <label>Meta Title
              <input type="text" name="meta_title" value="<?= ubai_h($content['meta_title'] ?? '') ?>">
            </label>
            <label>Meta Description
              <input type="text" name="meta_description" value="<?= ubai_h($content['meta_description'] ?? '') ?>">
            </label>
            <label>Hero Eyebrow
              <input type="text" name="hero_eyebrow" value="<?= ubai_h($content['hero_eyebrow'] ?? '') ?>">
            </label>
            <label>Hero Titel
              <input type="text" name="hero_title" value="<?= ubai_h($content['hero_title'] ?? '') ?>">
            </label>
            <label>Hero Logo URL
              <input type="text" name="hero_logo" value="<?= ubai_h($content['hero_logo'] ?? '') ?>">
            </label>
            <label>Hero Bild URL
              <input type="text" name="hero_image" value="<?= ubai_h($content['hero_image'] ?? '') ?>">
            </label>
          </div>

          <label>Hero Intro HTML
            <textarea name="hero_intro_html" rows="8"><?= ubai_h($content['hero_intro_html'] ?? '') ?></textarea>
          </label>
          <div class="admin-grid">
            <label>Hero Notiz Titel
              <input type="text" name="hero_note_title" value="<?= ubai_h($content['hero_note_title'] ?? '') ?>">
            </label>
            <label>Hero Notiz Text
              <input type="text" name="hero_note_text" value="<?= ubai_h($content['hero_note_text'] ?? '') ?>">
            </label>
            <label>&Uuml;berschrift Verband
              <input type="text" name="overview_title" value="<?= ubai_h($content['overview_title'] ?? '') ?>">
            </label>
            <label>Seitentitel Schwerpunkte
              <input type="text" name="overview_side_title" value="<?= ubai_h($content['overview_side_title'] ?? '') ?>">
            </label>
          </div>

          <label>Verband HTML
            <textarea name="overview_html" rows="8"><?= ubai_h($content['overview_html'] ?? '') ?></textarea>
          </label>
          <label>Schwerpunkte HTML
            <textarea name="overview_side_html" rows="8"><?= ubai_h($content['overview_side_html'] ?? '') ?></textarea>
          </label>

          <div class="admin-grid">
            <label>Abhyanga Titel
              <input type="text" name="abhyanga_title" value="<?= ubai_h($content['abhyanga_title'] ?? '') ?>">
            </label>
            <label>ADAVED Titel
              <input type="text" name="adaved_title" value="<?= ubai_h($content['adaved_title'] ?? '') ?>">
            </label>
          </div>
          <label>Abhyanga HTML
            <textarea name="abhyanga_html" rows="14"><?= ubai_h($content['abhyanga_html'] ?? '') ?></textarea>
          </label>
          <label>ADAVED HTML
            <textarea name="adaved_html" rows="8"><?= ubai_h($content['adaved_html'] ?? '') ?></textarea>
          </label>
          <div class="admin-grid">
            <label>ADAVED Bild URL
              <input type="text" name="adaved_image" value="<?= ubai_h($content['adaved_image'] ?? '') ?>">
            </label>
            <label>ADAVED Link URL
              <input type="text" name="adaved_link_url" value="<?= ubai_h($content['adaved_link_url'] ?? '') ?>">
            </label>
            <label>ADAVED Link Label
              <input type="text" name="adaved_link_label" value="<?= ubai_h($content['adaved_link_label'] ?? '') ?>">
            </label>
            <label>Ziele &Uuml;berschrift
              <input type="text" name="goals_title" value="<?= ubai_h($content['goals_title'] ?? '') ?>">
            </label>
          </div>
          <label>Ziele HTML
            <textarea name="goals_html" rows="10"><?= ubai_h($content['goals_html'] ?? '') ?></textarea>
          </label>

          <div class="admin-grid">
            <label>Mitgliedschaft Titel
              <input type="text" name="membership_title" value="<?= ubai_h($content['membership_title'] ?? '') ?>">
            </label>
            <label>Mitgliedschaft Bild URL
              <input type="text" name="membership_image" value="<?= ubai_h($content['membership_image'] ?? '') ?>">
            </label>
            <label>Aufnahmeformular URL
              <input type="text" name="membership_apply_url" value="<?= ubai_h($content['membership_apply_url'] ?? '') ?>">
            </label>
            <label>Satzung URL
              <input type="text" name="membership_bylaws_url" value="<?= ubai_h($content['membership_bylaws_url'] ?? '') ?>">
            </label>
          </div>
          <label>Mitgliedschaft HTML
            <textarea name="membership_html" rows="12"><?= ubai_h($content['membership_html'] ?? '') ?></textarea>
          </label>

          <div class="admin-grid">
            <label>Herkunft Titel
              <input type="text" name="origin_title" value="<?= ubai_h($content['origin_title'] ?? '') ?>">
            </label>
            <label>Kontakt Titel
              <input type="text" name="contact_title" value="<?= ubai_h($content['contact_title'] ?? '') ?>">
            </label>
            <label>Kontaktformular URL
              <input type="text" name="contact_form_url" value="<?= ubai_h($content['contact_form_url'] ?? '') ?>">
            </label>
            <label>Vorstand Titel
              <input type="text" name="board_title" value="<?= ubai_h($content['board_title'] ?? '') ?>">
            </label>
          </div>
          <label>Herkunft HTML
            <textarea name="origin_html" rows="8"><?= ubai_h($content['origin_html'] ?? '') ?></textarea>
          </label>
          <label>Kontakt HTML
            <textarea name="contact_html" rows="8"><?= ubai_h($content['contact_html'] ?? '') ?></textarea>
          </label>
          <label>Datenschutz HTML
            <textarea name="privacy_html" rows="6"><?= ubai_h($content['privacy_html'] ?? '') ?></textarea>
          </label>

          <?php foreach (($content['board_members'] ?? []) as $index => $member): ?>
            <div class="admin-grid admin-board">
              <label>Vorstand <?= $index + 1 ?> Name
                <input type="text" name="board_name_<?= $index ?>" value="<?= ubai_h($member['name'] ?? '') ?>">
              </label>
              <label>Vorstand <?= $index + 1 ?> Rolle
                <input type="text" name="board_role_<?= $index ?>" value="<?= ubai_h($member['role'] ?? '') ?>">
              </label>
              <label>Vorstand <?= $index + 1 ?> Bild URL
                <input type="text" name="board_image_<?= $index ?>" value="<?= ubai_h($member['image'] ?? '') ?>">
              </label>
            </div>
          <?php endforeach; ?>

          <button class="button button-primary" type="submit">Inhalte speichern</button>
        </form>

        <section class="admin-password">
          <h2>Passwort &auml;ndern</h2>
          <form class="admin-form" method="post">
            <input type="hidden" name="action" value="change_password">
            <div class="admin-grid">
              <label>Aktuelles Passwort
                <input type="password" name="current_password" autocomplete="current-password">
              </label>
              <label>Neues Passwort
                <input type="password" name="new_password" autocomplete="new-password">
              </label>
              <label>Neues Passwort wiederholen
                <input type="password" name="confirm_password" autocomplete="new-password">
              </label>
            </div>
            <button class="button button-secondary" type="submit">Passwort speichern</button>
          </form>
          <form method="post">
            <input type="hidden" name="action" value="logout">
            <button class="button button-secondary" type="submit">Abmelden</button>
          </form>
        </section>
      <?php endif; ?>
    </section>
  </main>
</body>
</html>
<?php
    exit;
}
?>
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= ubai_h($content['meta_title'] ?? 'UBAI.info') ?></title>
  <meta name="description" content="<?= ubai_h($content['meta_description'] ?? '') ?>">
  <meta name="theme-color" content="#efe4d2">
  <link rel="icon" href="assets/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Cormorant+Garamond:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="page-bg" aria-hidden="true">
    <div class="page-glow page-glow-a"></div>
    <div class="page-glow page-glow-b"></div>
    <div class="page-pattern"></div>
  </div>

  <header class="site-header">
    <a class="brand" href="#top" aria-label="UBAI Start">
      <img src="<?= ubai_h($content['hero_logo'] ?? 'assets/ubai-logo.gif') ?>" alt="UBAI Logo">
      <span>UBAI.info</span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
      <span></span>
      <span></span>
    </button>
    <nav id="site-nav" class="site-nav">
      <a href="#aktuelles">Aktuelles</a>
      <a href="#verband">Verband</a>
      <a href="#mitgliedschaft">Mitgliedschaft</a>
      <a href="#vorstand">Vorstand</a>
      <a href="#kontakt">Kontakt</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero section">
      <div class="hero-copy reveal">
        <p class="eyebrow"><?= ubai_h($content['hero_eyebrow'] ?? '') ?></p>
        <h1><?= ubai_h($content['hero_title'] ?? '') ?></h1>
        <div class="hero-text rich-text"><?= $content['hero_intro_html'] ?? '' ?></div>
        <div class="hero-actions">
          <a class="button button-primary" href="#aktuelles">Aktuelles ansehen</a>
          <a class="button button-secondary" href="#kontakt">Kontakt aufnehmen</a>
        </div>
      </div>
      <div class="hero-visual reveal">
        <div class="hero-card hero-card-logo">
          <img src="<?= ubai_h($content['hero_logo'] ?? 'assets/ubai-logo.gif') ?>" alt="UBAI Logo gro&szlig;">
        </div>
        <div class="hero-note">
          <strong><?= ubai_h($content['hero_note_title'] ?? '') ?></strong>
          <span><?= ubai_h($content['hero_note_text'] ?? '') ?></span>
        </div>
      </div>
    </section>

    <section id="aktuelles" class="section">
      <div class="section-head reveal">
        <p class="eyebrow">Aktuelles</p>
        <h2><?= ubai_h($content['abhyanga_title'] ?? '') ?></h2>
      </div>
      <div class="cards cards-2">
        <article class="panel panel-feature reveal">
          <div class="rich-text"><?= $content['abhyanga_html'] ?? '' ?></div>
        </article>
        <article class="panel reveal">
          <p class="eyebrow">ADAVED</p>
          <h3><?= ubai_h($content['adaved_title'] ?? '') ?></h3>
          <img class="float-image" src="<?= ubai_h($content['adaved_image'] ?? 'assets/adaved-gruendung.jpg') ?>" alt="ADAVED">
          <div class="rich-text"><?= $content['adaved_html'] ?? '' ?></div>
          <a class="text-link" href="<?= ubai_h($content['adaved_link_url'] ?? '#') ?>" target="_blank" rel="noreferrer"><?= ubai_h($content['adaved_link_label'] ?? '') ?></a>
        </article>
      </div>
    </section>

    <section id="verband" class="section section-grid">
      <article class="panel reveal">
        <p class="eyebrow">Verband</p>
        <h2><?= ubai_h($content['overview_title'] ?? '') ?></h2>
        <div class="rich-text"><?= $content['overview_html'] ?? '' ?></div>
      </article>

      <aside class="panel panel-accent reveal">
        <h3><?= ubai_h($content['overview_side_title'] ?? '') ?></h3>
        <div class="rich-text"><?= $content['overview_side_html'] ?? '' ?></div>
      </aside>
    </section>

    <section class="section">
      <div class="section-head reveal">
        <p class="eyebrow">Ziele</p>
        <h2><?= ubai_h($content['goals_title'] ?? '') ?></h2>
      </div>
      <article class="panel reveal">
        <div class="rich-text"><?= $content['goals_html'] ?? '' ?></div>
      </article>
    </section>

    <section id="mitgliedschaft" class="section section-grid membership-grid">
      <article class="panel panel-image reveal">
        <img src="<?= ubai_h($content['membership_image'] ?? 'assets/mitgliedschaft.jpg') ?>" alt="Gr&uuml;ndungsbild UBAI">
      </article>
      <article class="panel reveal">
        <p class="eyebrow">Mitgliedschaft</p>
        <h2><?= ubai_h($content['membership_title'] ?? '') ?></h2>
        <div class="rich-text"><?= $content['membership_html'] ?? '' ?></div>
        <div class="hero-actions">
          <a class="button button-primary" href="<?= ubai_h($content['membership_apply_url'] ?? '#') ?>" target="_blank" rel="noreferrer">Aufnahmeformular &ouml;ffnen</a>
          <a class="button button-secondary" href="<?= ubai_h($content['membership_bylaws_url'] ?? '#') ?>" target="_blank" rel="noreferrer">Satzung ansehen</a>
        </div>
      </article>
    </section>

    <section class="section">
      <div class="cards cards-2">
        <article class="panel reveal">
          <p class="eyebrow">Herkunft</p>
          <h2><?= ubai_h($content['origin_title'] ?? '') ?></h2>
          <div class="rich-text"><?= $content['origin_html'] ?? '' ?></div>
        </article>
        <article id="kontakt" class="contact-card reveal">
          <div>
            <p class="eyebrow">Kontakt</p>
            <h2><?= ubai_h($content['contact_title'] ?? '') ?></h2>
            <div class="rich-text contact-address"><?= $content['contact_html'] ?? '' ?></div>
            <div class="rich-text privacy-note"><?= $content['privacy_html'] ?? '' ?></div>
          </div>
          <div class="contact-actions">
            <a class="button button-primary" href="<?= ubai_h($content['contact_form_url'] ?? '#') ?>" target="_blank" rel="noreferrer">R&uuml;ckfrage senden</a>
            <a class="button button-secondary" href="impressum.html">Impressum</a>
            <a class="button button-secondary" href="datenschutz.html">Datenschutz</a>
          </div>
        </article>
      </div>
    </section>

    <section id="vorstand" class="section">
      <div class="section-head reveal">
        <p class="eyebrow">Vorstand</p>
        <h2><?= ubai_h($content['board_title'] ?? '') ?></h2>
      </div>
      <div class="cards cards-4">
        <?php foreach (($content['board_members'] ?? []) as $member): ?>
          <article class="panel person-card reveal">
            <img src="<?= ubai_h($member['image'] ?? '') ?>" alt="<?= ubai_h($member['name'] ?? '') ?>">
            <h3><?= ubai_h($member['name'] ?? '') ?></h3>
            <p><?= ubai_h($member['role'] ?? '') ?></p>
          </article>
        <?php endforeach; ?>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <nav>
      <a href="impressum.html">Impressum</a>
      <a href="datenschutz.html">Datenschutz</a>
      <a href="alteversion/index.php">Altversion</a>
      <a href="?page=admin">Admin</a>
    </nav>
  </footer>

  <script src="main.js"></script>
</body>
</html>
