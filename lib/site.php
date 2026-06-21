<?php
declare(strict_types=1);

const UBAI_CONTENT_FILE = __DIR__ . '/../data/content.php';
const UBAI_ADMIN_FILE = __DIR__ . '/../data/admin.php';

function ubai_h(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

function ubai_load_array_file(string $path, array $fallback = []): array
{
    if (!is_file($path)) {
        return $fallback;
    }

    $data = include $path;
    return is_array($data) ? $data : $fallback;
}

function ubai_save_array_file(string $path, array $data): bool
{
    $payload = "<?php\nreturn " . var_export($data, true) . ";\n";
    return file_put_contents($path, $payload, LOCK_EX) !== false;
}

function ubai_load_content(): array
{
    return ubai_load_array_file(UBAI_CONTENT_FILE);
}

function ubai_save_content(array $content): bool
{
    return ubai_save_array_file(UBAI_CONTENT_FILE, $content);
}

function ubai_load_admin(): array
{
    return ubai_load_array_file(UBAI_ADMIN_FILE, [
        'username' => 'admin',
        'password_hash' => '',
        'must_change_password' => true,
    ]);
}

function ubai_save_admin(array $admin): bool
{
    return ubai_save_array_file(UBAI_ADMIN_FILE, $admin);
}

function ubai_hash_password(string $username, string $password): string
{
    return hash('sha256', strtolower(trim($username)) . '|' . $password . '|UBAI-2026');
}

function ubai_is_logged_in(): bool
{
    return !empty($_SESSION['ubai_admin_user']);
}

function ubai_login(array $admin, string $username, string $password): bool
{
    $storedUser = (string) ($admin['username'] ?? '');
    $storedHash = (string) ($admin['password_hash'] ?? '');

    if ($storedUser === '' || $storedHash === '') {
        return false;
    }

    $matchesUser = hash_equals(strtolower($storedUser), strtolower(trim($username)));
    $matchesPassword = hash_equals($storedHash, ubai_hash_password($storedUser, $password));

    if (!$matchesUser || !$matchesPassword) {
        return false;
    }

    session_regenerate_id(true);
    $_SESSION['ubai_admin_user'] = $storedUser;
    return true;
}

function ubai_logout(): void
{
    unset($_SESSION['ubai_admin_user']);
}

function ubai_post_value(array $source, string $key): string
{
    $value = $source[$key] ?? '';
    return trim(str_replace("\r\n", "\n", (string) $value));
}

function ubai_content_from_post(array $post, array $current): array
{
    $members = [];
    $memberCount = max(1, count($current['board_members'] ?? []));

    for ($i = 0; $i < $memberCount; $i++) {
        $members[] = [
            'name' => ubai_post_value($post, "board_name_$i"),
            'role' => ubai_post_value($post, "board_role_$i"),
            'image' => ubai_post_value($post, "board_image_$i"),
        ];
    }

    return [
        'meta_title' => ubai_post_value($post, 'meta_title'),
        'meta_description' => ubai_post_value($post, 'meta_description'),
        'hero_eyebrow' => ubai_post_value($post, 'hero_eyebrow'),
        'hero_title' => ubai_post_value($post, 'hero_title'),
        'hero_intro_html' => ubai_post_value($post, 'hero_intro_html'),
        'hero_note_title' => ubai_post_value($post, 'hero_note_title'),
        'hero_note_text' => ubai_post_value($post, 'hero_note_text'),
        'hero_logo' => ubai_post_value($post, 'hero_logo'),
        'hero_image' => ubai_post_value($post, 'hero_image'),
        'overview_title' => ubai_post_value($post, 'overview_title'),
        'overview_html' => ubai_post_value($post, 'overview_html'),
        'overview_side_title' => ubai_post_value($post, 'overview_side_title'),
        'overview_side_html' => ubai_post_value($post, 'overview_side_html'),
        'abhyanga_title' => ubai_post_value($post, 'abhyanga_title'),
        'abhyanga_html' => ubai_post_value($post, 'abhyanga_html'),
        'adaved_title' => ubai_post_value($post, 'adaved_title'),
        'adaved_html' => ubai_post_value($post, 'adaved_html'),
        'adaved_image' => ubai_post_value($post, 'adaved_image'),
        'adaved_link_url' => ubai_post_value($post, 'adaved_link_url'),
        'adaved_link_label' => ubai_post_value($post, 'adaved_link_label'),
        'goals_title' => ubai_post_value($post, 'goals_title'),
        'goals_html' => ubai_post_value($post, 'goals_html'),
        'membership_title' => ubai_post_value($post, 'membership_title'),
        'membership_html' => ubai_post_value($post, 'membership_html'),
        'membership_image' => ubai_post_value($post, 'membership_image'),
        'membership_apply_url' => ubai_post_value($post, 'membership_apply_url'),
        'membership_bylaws_url' => ubai_post_value($post, 'membership_bylaws_url'),
        'origin_title' => ubai_post_value($post, 'origin_title'),
        'origin_html' => ubai_post_value($post, 'origin_html'),
        'contact_title' => ubai_post_value($post, 'contact_title'),
        'contact_html' => ubai_post_value($post, 'contact_html'),
        'contact_form_url' => ubai_post_value($post, 'contact_form_url'),
        'privacy_html' => ubai_post_value($post, 'privacy_html'),
        'board_title' => ubai_post_value($post, 'board_title'),
        'board_members' => $members,
    ];
}
