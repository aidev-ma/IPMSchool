<?php
/**
 * Helper d'envoi d'email via PHPMailer + SMTP.
 *
 * Lit la configuration SMTP depuis le tableau $config (chargé par db.php
 * depuis config.local.php). N'expose jamais d'exception : retourne un bool
 * et log les erreurs via error_log() pour rester silencieux côté visiteur.
 *
 * Clés de configuration attendues dans $config :
 *   - smtp_host        (ex: 'mail.ipmschool.ma')
 *   - smtp_port        (ex: 465 ou 587)
 *   - smtp_secure      ('ssl' pour 465, 'tls' pour 587)
 *   - smtp_user        (ex: 'noreply@ipmschool.ma')
 *   - smtp_pass        (mot de passe de la boîte SMTP)
 *   - mail_from_email  (ex: 'noreply@ipmschool.ma')
 *   - mail_from_name   (ex: 'IPM School - Site Web')
 *
 * Optionnel :
 *   - mail_enabled          (bool, défaut true)  : permet de désactiver tout envoi
 *   - mail_debug            (bool, défaut false) : sortie debug PHPMailer dans error_log
 *   - mail_smtp_skip_verify (bool, défaut false) : désactive la vérification du
 *     certificat SSL/TLS (utile pour smtp_host = 'localhost' où le cert ne
 *     matche pas le hostname). À n'activer que pour des connexions locales.
 */

require_once __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/lib/PHPMailer/SMTP.php';
require_once __DIR__ . '/lib/PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

/**
 * Envoie une notification email.
 *
 * @param array       $config        Tableau de configuration (depuis config.local.php)
 * @param string      $to            Adresse destinataire
 * @param string      $subject       Sujet
 * @param string      $htmlBody      Corps HTML
 * @param string      $textBody      Corps texte (alternative pour clients non-HTML)
 * @param string|null $replyToEmail  Adresse Reply-To (typiquement l'email du prospect)
 * @param string|null $replyToName   Nom Reply-To (typiquement le nom du prospect)
 *
 * @return bool true si envoyé, false sinon (erreur loggée dans error_log)
 */
function sendNotificationEmail(
    array $config,
    string $to,
    string $subject,
    string $htmlBody,
    string $textBody,
    ?string $replyToEmail = null,
    ?string $replyToName = null
): bool {
    $enabled = $config['mail_enabled'] ?? true;
    if (!$enabled) {
        return true;
    }

    $required = ['smtp_host', 'smtp_port', 'smtp_secure', 'smtp_user', 'smtp_pass', 'mail_from_email', 'mail_from_name'];
    foreach ($required as $key) {
        if (empty($config[$key])) {
            error_log("Mailer: configuration SMTP incomplète, clé manquante: $key");
            return false;
        }
    }

    $mail = new PHPMailer(true);

    try {
        if (!empty($config['mail_debug'])) {
            $mail->SMTPDebug   = SMTP::DEBUG_SERVER;
            $mail->Debugoutput = function ($str, $level) {
                error_log("PHPMailer debug ($level): " . trim($str));
            };
        }

        $mail->isSMTP();
        $mail->Host          = $config['smtp_host'];
        $mail->SMTPAuth      = true;
        $mail->Username      = $config['smtp_user'];
        $mail->Password      = $config['smtp_pass'];
        $mail->Port          = (int) $config['smtp_port'];

        $secure = strtolower((string) $config['smtp_secure']);
        if ($secure === 'ssl' || $secure === 'smtps') {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        } elseif ($secure === 'tls' || $secure === 'starttls') {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        }

        if (!empty($config['mail_smtp_skip_verify'])) {
            $mail->SMTPOptions = [
                'ssl' => [
                    'verify_peer'       => false,
                    'verify_peer_name'  => false,
                    'allow_self_signed' => true,
                ],
            ];
        }

        $mail->CharSet  = PHPMailer::CHARSET_UTF8;
        $mail->Encoding = PHPMailer::ENCODING_BASE64;

        $mail->setFrom($config['mail_from_email'], $config['mail_from_name']);
        $mail->addAddress($to);

        if ($replyToEmail && filter_var($replyToEmail, FILTER_VALIDATE_EMAIL)) {
            $mail->addReplyTo($replyToEmail, $replyToName ?? '');
        }

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $htmlBody;
        $mail->AltBody = $textBody;

        $mail->send();
        return true;
    } catch (PHPMailerException $e) {
        error_log("Mailer: échec envoi vers $to : " . $mail->ErrorInfo);
        return false;
    } catch (\Throwable $e) {
        error_log("Mailer: exception inattendue vers $to : " . $e->getMessage());
        return false;
    }
}

/**
 * Échappe une chaîne pour insertion dans du HTML.
 * Pratique pour construire les corps d'email à partir des données utilisateur.
 */
function mailerEscape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
