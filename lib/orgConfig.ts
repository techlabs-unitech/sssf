export const ORG = {
  name: process.env.ORG_NAME || "Sri Sai Swamy Seva Foundation",
  shortName: process.env.ORG_SHORT_NAME || "Sri Sai Swamy Seva Foundation",
  legalName: process.env.ORG_LEGAL_NAME || "Sri Sai Swamy Seva Foundation",
  addressLine:
    process.env.ORG_ADDRESS ||
    "NO 13/7, Guttapalya Village, Gownipalli Post, Chintamani Taluk, Chikkaballapura District, Karnataka - 563161",
  phone: process.env.ORG_PHONE || "+91 99729 55391",
  email: process.env.ORG_EMAIL || "srisaiswamysevafoundation@gmail.com",
  website: process.env.ORG_WEBSITE || "srisaiswamysevafoundation.com",
  pan: process.env.ORG_PAN || "ABFCS2398G",
  facebook: process.env.ORG_FACEBOOK || "https://www.facebook.com/people/Srisai-swamy-seva-foundation/61594044470080",
  instagram: process.env.ORG_INSTAGRAM || "https://www.instagram.com/sssf_foundation",
  linkedin: process.env.ORG_LINKEDIN || "https://www.linkedin.com/company/srisai-swamy-seva-foundation",
  legalPageTitle: "Legal and compliance",
  legalPageDescription:
    "Public legal and compliance information for Sri Sai Swamy Seva Foundation. Certificate and status details are shown only where verified documentation exists.",
  foundationProfileUrl: process.env.ORG_PROFILE_URL || "/Srisai-Swamy-Seva-Foundation.pdf",
  mapQuery:
    "Srisai Swamy Seva Foundation, NO 13/7, Yegavakote - Gownipalli Rd, Guttapalya, Karnataka 563146",
  mapEmbedSrc:
    "https://www.google.com/maps?q=Srisai+Swamy+Seva+Foundation%2C+Yegavakote+-+Gownipalli+Rd%2C+Guttapalya%2C+Karnataka+563146&output=embed",
  mapLinkUrl:
    "https://maps.app.goo.gl/2TumVGssV3pDm9Ur9",
};

export const ORG_CONTACT = {
  phoneDisplay: ORG.phone,
  emailDisplay: ORG.email,
  addressDisplay: ORG.addressLine,
  websiteDisplay: ORG.website,
};
