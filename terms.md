---
meta-description: Terms of Service for CipherCapital and SecurityAuditAI.
meta-viewport: width=device-width, initial-scale=1.0
title: Terms of Service — CipherCapital
---

![CipherCapital logo](https://randysimpey.github.io/ciphercapital-hub/assets/logo.png)CipherCapital

[← Back to home](https://randysimpey.github.io/ciphercapital-hub/)

# Terms of Service

*Last updated: September 14, 2026*

These terms govern your use of SecurityAuditAI and the CipherCapital website, operated by **ICT Support By Randy**, a sole proprietorship based in Amsterdam, the Netherlands, registered for Dutch VAT. By using this site or the scanning service, you agree to these terms.

## The service

SecurityAuditAI scans public (and, on paid plans, private) GitHub repositories for:

- Hardcoded secrets and credentials (via Gitleaks)
- Vulnerable dependencies and infrastructure-as-code misconfigurations (via Trivy)

Results are summarized in a report and sent to the email address you provide. The service is provided on an "as-is" basis — see Disclaimer below.

## Plans and billing

- **Free**: 1 scan per month, or a 14-day full-access trial. No payment required.
- **Pro** ($49/month): unlimited scans across up to 5 repositories, auto-remediation snippets. Billed monthly via Stripe.
- **Business** ($199/month): CI/CD integration, scan-on-commit, team management, compliance-ready reports. Billed monthly via Stripe.

Paid plans are billed in advance on a recurring monthly basis. **You can cancel at any time** through your billing portal; cancellation takes effect at the end of the current billing period, and you retain access until then. No refunds are given for partial months unless required by law.

## Acceptable use

You agree not to:

- Submit repositories you do not own or do not have permission to scan.
- Use the service to probe, attack, or gain unauthorized access to systems.
- Attempt to circumvent scan limits, reverse-engineer the scanning infrastructure, or resell the service without a commercial agreement.

We reserve the right to suspend access for accounts that violate these terms.

## Disclaimer

SecurityAuditAI is a detection aid, not a guarantee. A scan reducing to "no issues found" does **not** mean your repository is free of vulnerabilities — it means no issues matching our current checks (known CVE patterns, common secret formats, known IaC misconfigurations) were found at the time of the scan. Security scanning tools have false negatives; this service should be one layer in your security practice, not the only one.

We are not liable for any damages resulting from reliance on scan results, including but not limited to security incidents that occur despite a clean scan report.

## Data during scans

See our [Privacy Policy](https://randysimpey.github.io/ciphercapital-hub/privacy.md) for details on what happens to your code and data — in short: repos are cloned temporarily for the scan and deleted immediately after, on every plan.

## Changes to these terms

We may update these terms from time to time. Material changes will be communicated to active subscribers by email, and the "Last updated" date above will reflect the change.

## Governing law

These terms are governed by the laws of the Netherlands.

## Contact

Questions about these terms? Reach out at <secrapports@outlook.com>.

---

[YouTube](https://www.youtube.com/@CipherCapitalCap) [Instagram](https://instagram.com/ciphercapitalreall) [TikTok](https://tiktok.com/@ciphercapital) <secrapports@outlook.com>

![](https://randysimpey.github.io/ciphercapital-hub/assets/logo.png) built by CipherCapital — no ads, no tracking, just security
