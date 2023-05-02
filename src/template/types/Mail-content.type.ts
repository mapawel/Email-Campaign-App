export type MailContentType = {
    logoUrl: string;
    logoAlt: string;
    mainTitle: string;
    subtitle?: string;
    content: ContentType[];
    footerLongText: string;
    footerTextLink: string;
    footerLinkUrl: string;
    footerLogoUrl: string;
    footerLogoAlt: string;
};

type ContentType = {
    title: string;
    subtitle: string;
    text: string;
    linkText?: string;
    linkUrl?: string;
    imageUrl?: string;
    imageAlt?: string;
};
