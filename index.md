---
meta-description: Real vulnerabilities, real code, real fixes. Plus SecurityAuditAI: automated security audits in under 2 minutes.
meta-viewport: width=device-width, initial-scale=1.0
title: CipherCapital — Cybersecurity tutorials that ship fixes
---

![CipherCapital logo](https://randysimpey.github.io/ciphercapital-hub/assets/logo.png)CipherCapital

[EN](https://randysimpey.github.io/ciphercapital-hub/) / [NL](https://randysimpey.github.io/ciphercapital-hub/nl/)

[Run a free scan](#scan)

# Cybersecurity tutorials that ship fixes, not theory.

Real vulnerabilities, real code, real terminals. Every video ends with how to catch the same issue automatically — for free.

[Run a free scan](#scan) [Watch the latest tutorial](#tutorial)

$ securityauditai scan ./repo

Scanning secrets, dependencies, IaC...

✓ 0 hardcoded secrets found

⚠ 3 vulnerable dependencies

⚠ 1 IaC misconfiguration

Report emailed in ~90 seconds

$

<!-- PLACEHOLDER: vul dit in zodra je échte cijfers hebt — een teller zonder bewijs werkt averechts. Zodra je bijv. Stripe/DB cijfers hebt: "1.200+ repo's gescand" of "Vertrouwd door X developers". Laat deze sectie weg totdat je een eerlijk getal hebt. -->
<!--
## Trusted by developers who ship

**[X]+ repos scanned** · **[X]+ developers** · **[X] vulnerabilities caught**

> "[Echte quote van een gebruiker/kijker hier]" — [Naam, functie/bedrijf]
-->

## What a scan actually finds

Here's a real (anonymized) excerpt from an actual SecurityAuditAI report, so you know exactly what lands in your inbox before you paste your own repo.

```
SecurityAuditAI — Repo Security Report
Repo: [anonymized]/api-service · Scanned: 2m 14s

SECRETS (Gitleaks)
⚠ 1 hardcoded AWS access key — config/legacy_settings.py:42
  → Found in commit history, not just current HEAD

DEPENDENCIES (Trivy)
⚠ CVE-2024-XXXXX — lodash@4.17.15 (High) — upgrade to 4.17.21
⚠ CVE-2023-XXXXX — express@4.16.0 (Medium) — upgrade to 4.19.2

INFRASTRUCTURE AS CODE (Trivy)
⚠ Dockerfile runs as root — add a non-root USER directive
⚠ Kubernetes deployment.yaml missing resource limits

Summary: 1 exposed secret, 2 vulnerable dependencies, 2 IaC issues.
Full report with fix snippets → sent to your inbox.
```

<!-- PLACEHOLDER: vervang dit codeblok door een echte screenshot (geanonimiseerd) van je e-mailrapport zodra je die hebt — een screenshot converteert beter dan tekst. -->

## Gear & tools

What I actually use — no filler, updated as the list grows.

YubiKey 5 NFC

Hardware security key — phishing-resistant 2FA for GitHub, Google, and everything else in this channel's threat model. [See it on Amazon →](https://www.amazon.com/dp/B07HBD71HL?tag=ciphercapital-20)

Logitech Brio 4K Webcam

What's on camera for every video on this channel — 4K, HDR, and Windows Hello support if you need it. [See it on Amazon →](https://www.amazon.com/dp/B01N5UOYC4?tag=ciphercapital-20)

Keychron K8 Mechanical Keyboard

What you hear in every terminal-heavy screen recording. Hot-swappable switches, wireless or wired. [See options on Amazon →](https://www.amazon.com/s?k=Keychron+K8+wireless+mechanical+keyboard&tag=ciphercapital-20)

The Web Application Hacker's Handbook

The book most working pentesters cite as where they actually learned the craft — still holds up. [See options on Amazon →](https://www.amazon.com/s?k=The+Web+Application+Hacker%27s+Handbook&tag=ciphercapital-20)

## About

I'm Randy, the person behind CipherCapital and SecurityAuditAI. I come from a civil engineering and IT/entrepreneurial background, not a "big security firm" one — which is exactly why this channel exists: I document the real checks that catch real issues, without the vendor fluff, and I build the tool alongside the tutorials so you can automate what you just watched.

CipherCapital breaks down real-world security vulnerabilities — hardcoded secrets, outdated dependencies, misconfigured infrastructure, exposed APIs — with hands-on walkthroughs you can follow along with.

Alongside the videos, I'm building SecurityAuditAI: a tool that automates the exact checks covered in each tutorial, so you can catch the same issues across your own codebase in under two minutes, instead of hunting for them by hand.

<!-- PLACEHOLDER: voeg hier een eigen foto toe (bijv. een still uit een video of een portretfoto) — een anoniem "About"-blok zonder gezicht bouwt nauwelijks meer vertrouwen op dan geen "About" sectie. -->

## Latest tutorial

<!-- PLACEHOLDER: vervang VIDEO_ID door je best presterende of nieuwste video-ID zodra je er een hebt live staan. -->
<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;">
<iframe src="https://www.youtube.com/embed/VIDEO_ID" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allowfullscreen></iframe>
</div>

[See all tutorials on YouTube →](https://www.youtube.com/@CipherCapitalCap)

## Free security audit

Paste a public GitHub repo. Get a report on exposed secrets, vulnerable dependencies, and IaC misconfigurations — emailed to you.

1

### Paste your repo

Any public GitHub repository. No install, no account, no credit card.

2

### We scan it

Gitleaks checks for leaked secrets. Trivy checks dependencies and infrastructure config. Usually done in under 2 minutes.

3

### Get your report

A plain-language summary emailed straight to you — what was found, where, and why it matters.

## What gets checked

Secrets detection

Hardcoded API keys, passwords, SSH keys, and tokens — including ones buried in old commits, not just the current code.

Dependency vulnerabilities

Outdated or vulnerable open-source packages, matched against the OWASP Top 10 and known CVE databases.

Infrastructure as Code

Misconfigurations in Dockerfiles, Kubernetes manifests, and Terraform — the kind that quietly leave a door open.

API security

Not in the free static scan — this needs a live endpoint, not just a repo. Available as a manual review, or automatically on SecurityAuditAI Pro.

## Pricing

The scan above is free, no account needed. For teams who want this running automatically:

Free

$0

1 free scan/month, or 14 days full access. No credit card.

- Manual scans via this page
- Full report by email

Pro

$49/mo

For individual developers and small teams.

- Unlimited scans, up to 5 repos
- Auto-remediation code snippets
[Upgrade to Pro](https://buy.stripe.com/5kQ28q4cz7HMgnMaoF1sQ00)

Business

$199/mo

CI/CD integration and team management.

- Scan on every commit
- SOC 2 / GDPR-ready compliance reports
[Upgrade to Business](https://buy.stripe.com/3cI9AS5gD3rw9Zo68p1sQ01)

## Trust & security

**Your code, briefly and only.** The repo is cloned into a temporary directory for the scan, then deleted immediately after — nothing is kept on our servers for free scans.

**Built on open, established scanners.** Secrets and dependency/IaC checks run on [Gitleaks](https://github.com/gitleaks/gitleaks) and [Trivy](https://github.com/aquasecurity/trivy) — the same tools used in production CI/CD pipelines, not a black-box in-house scanner.

<!-- PLACEHOLDER: als je een privacy policy en terms pagina hebt (of maakt), voeg hier links toe: -->
<!-- [Privacy Policy](#) · [Terms of Service](#) -->

## Questions

**Is my code stored anywhere?**

No. The repo is cloned into a temporary directory for the scan, then deleted immediately after. Nothing is kept on our servers.

**Does this work on private repos?**

Not in the free version — it only scans public repos right now. Private-repo support is part of the paid tiers.

**How long does a scan take?**

Usually under 2 minutes for most repos. Larger repos (closer to the 300MB limit) can take a bit longer.

**What counts as a "vulnerability"?**

Known, publicly-disclosed issues in your dependencies (tracked by CVE ID), plus common misconfiguration patterns in IaC files — not a guess, a match against established databases.

**What happens to my code on Pro or Business plans?**

Same rule applies: repos are cloned for the duration of the scan and deleted immediately after, on every plan. Paid tiers add private-repo access and CI/CD integration — not longer retention.

**Can I cancel anytime?**

Yes. Pro and Business are billed monthly with no long-term contract — cancel anytime from your billing portal, no questions asked.

**What languages and frameworks are supported?**

Dependency and IaC scanning covers the ecosystems Trivy supports out of the box — including npm/Node, Python (pip), Java (Maven/Gradle), Go, Ruby, and Docker/Kubernetes/Terraform files. Secrets detection works across any file type in the repo.

**Get the free checklist + new tutorials in your inbox**

The 5-Minute Repo Security Checklist — a quick manual pass to run before you push. No spam, no automation, just updates when something new drops.

[Or just grab the checklist directly, no signup needed →](https://randysimpey.github.io/ciphercapital-hub/assets/5-minute-repo-security-checklist.pdf)

[YouTube](https://www.youtube.com/@CipherCapitalCap) [Instagram](https://instagram.com/ciphercapitalreall) [TikTok](https://tiktok.com/@ciphercapital) <secrapports@outlook.com>

![](https://randysimpey.github.io/ciphercapital-hub/assets/logo.png) built by CipherCapital — no ads, no tracking, just security
