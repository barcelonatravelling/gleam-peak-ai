import type { Lang } from "./content";

type LegalDoc = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: { title: string; body: string[] }[];
};

// The controller details (art. 13 GDPR, art. 10 LSSI) still have to be added once the company is constituted.
export const privacy: Record<Lang, LegalDoc> = {
  es: {
    eyebrow: "Gleam Peak AI",
    title: "Política de privacidad",
    intro: "Esta política explica cómo tratamos los datos personales que nos facilitas a través de este sitio web.",
    updated: "Última actualización: octubre de 2026",
    sections: [
      {
        title: "1. Responsable del tratamiento",
        body: [
          "Gleam Peak AI.",
          "Contacto para cualquier cuestión sobre privacidad: hello@gleampeak.ai.",
        ],
      },
      {
        title: "2. Qué datos tratamos",
        body: [
          "Los datos que introduces en el formulario de contacto: nombre, organización, correo profesional, tipo de colaboración y mensaje.",
          "Los mensajes que escribes en el asistente de la web. No los guardamos. Se envían a OpenAI para generar la respuesta, y OpenAI puede conservarlos temporalmente según sus condiciones.",
          "Este sitio no utiliza cookies de analítica ni de publicidad. Para saber qué páginas se visitan usamos Vercel Web Analytics, que no instala cookies ni identifica a las personas: solo registra datos agregados como la página vista, el país, el tipo de dispositivo y la web de procedencia. El idioma se elige con la dirección de la página (/en para inglés), sin guardar nada en tu navegador.",
        ],
      },
      {
        title: "3. Finalidad y base jurídica",
        body: [
          "Utilizamos tus datos para responder a tu solicitud y, si procede, mantener la conversación sobre la colaboración que propones. Los mensajes del asistente solo se usan para contestarte en ese momento.",
          "La base jurídica es tu consentimiento, que puedes retirar en cualquier momento, y la aplicación de medidas precontractuales a petición tuya.",
        ],
      },
      {
        title: "4. Conservación",
        body: [
          "Conservamos los datos mientras dure la conversación y, después, solo durante el tiempo necesario para atender posibles obligaciones legales.",
        ],
      },
      {
        title: "5. Destinatarios y proveedores",
        body: [
          "No cedemos tus datos a terceros salvo obligación legal.",
          "Para operar el sitio utilizamos proveedores que actúan como encargados del tratamiento: Web3Forms, que recibe el formulario y lo reenvía a nuestro correo; OpenAI, que genera las respuestas del asistente, y Vercel, que aloja el sitio y ofrece la analítica sin cookies.",
        ],
      },
      {
        title: "6. Tus derechos",
        body: [
          "Puedes solicitar el acceso, la rectificación, la supresión, la limitación o la portabilidad de tus datos, oponerte a su tratamiento y retirar tu consentimiento escribiendo a hello@gleampeak.ai.",
          "Si consideras que no hemos atendido tus derechos, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).",
        ],
      },
    ],
  },
  en: {
    eyebrow: "Gleam Peak AI",
    title: "Privacy policy",
    intro: "This policy explains how we process the personal data you share with us through this website.",
    updated: "Last updated: October 2026",
    sections: [
      {
        title: "1. Data controller",
        body: [
          "Gleam Peak AI.",
          "Contact for any privacy matter: hello@gleampeak.ai.",
        ],
      },
      {
        title: "2. What data we process",
        body: [
          "The data you enter in the contact form: name, organisation, work email, type of collaboration and message.",
          "The messages you write in the website assistant. We do not store them. They are sent to OpenAI to generate the reply, and OpenAI may retain them temporarily under its terms.",
          "This website does not use analytics or advertising cookies. To learn which pages are visited we use Vercel Web Analytics, which sets no cookies and does not identify individuals: it only records aggregated data such as the page viewed, country, device type and referring site. The language is chosen through the page address (/en for English), with nothing stored in your browser.",
        ],
      },
      {
        title: "3. Purpose and legal basis",
        body: [
          "We use your data to respond to your request and, where appropriate, to continue the conversation about the collaboration you propose. Assistant messages are only used to answer you at that moment.",
          "The legal basis is your consent, which you can withdraw at any time, and steps taken at your request prior to entering into a contract.",
        ],
      },
      {
        title: "4. Retention",
        body: [
          "We keep the data for as long as the conversation lasts and, afterwards, only for as long as needed to meet possible legal obligations.",
        ],
      },
      {
        title: "5. Recipients and providers",
        body: [
          "We do not share your data with third parties unless required by law.",
          "To run the website we use providers acting as data processors: Web3Forms, which receives the form and forwards it to our inbox; OpenAI, which generates the assistant's replies; and Vercel, which hosts the site and provides the cookieless analytics.",
        ],
      },
      {
        title: "6. Your rights",
        body: [
          "You can request access, rectification, erasure, restriction or portability of your data, object to its processing and withdraw your consent by writing to hello@gleampeak.ai.",
          "If you believe we have not respected your rights, you can lodge a complaint with the Spanish Data Protection Agency (www.aepd.es).",
        ],
      },
    ],
  },
};

export const terms: Record<Lang, LegalDoc> = {
  es: {
    eyebrow: "Gleam Peak AI",
    title: "Términos de uso",
    intro: "Estos términos regulan el uso del sitio web de Gleam Peak AI.",
    updated: "Última actualización: octubre de 2026",
    sections: [
      {
        title: "1. Titular del sitio",
        body: [
          "Este sitio pertenece a Gleam Peak AI.",
          "Contacto: hello@gleampeak.ai.",
        ],
      },
      {
        title: "2. Uso del sitio",
        body: [
          "Puedes utilizar este sitio con fines informativos y profesionales legítimos. No debes usarlo para actividades ilícitas o que afecten a su funcionamiento.",
        ],
      },
      {
        title: "3. Propiedad intelectual",
        body: [
          "Salvo que se indique lo contrario, los textos, el diseño, la marca y los materiales del sitio pertenecen a Gleam Peak AI o se utilizan con autorización.",
        ],
      },
      {
        title: "4. Carácter informativo",
        body: [
          "Los productos descritos, incluido Trust Gateway, son prototipos en desarrollo. La información del sitio tiene carácter general, no constituye una oferta comercial y no implica que su uso baste para cumplir ninguna normativa.",
        ],
      },
      {
        title: "5. Enlaces externos",
        body: [
          "El sitio puede incluir enlaces a plataformas de terceros. No somos responsables de su contenido ni de sus prácticas.",
        ],
      },
      {
        title: "6. Responsabilidad",
        body: [
          "En la medida permitida por la ley, Gleam Peak AI no será responsable de los daños indirectos derivados del uso del sitio.",
        ],
      },
      {
        title: "7. Cambios y legislación aplicable",
        body: [
          "Podemos actualizar estos términos. La versión vigente es la publicada en esta página. Se rigen por la legislación española.",
        ],
      },
    ],
  },
  en: {
    eyebrow: "Gleam Peak AI",
    title: "Terms of use",
    intro: "These terms govern the use of the Gleam Peak AI website.",
    updated: "Last updated: October 2026",
    sections: [
      {
        title: "1. Website owner",
        body: [
          "This website belongs to Gleam Peak AI.",
          "Contact: hello@gleampeak.ai.",
        ],
      },
      {
        title: "2. Use of the website",
        body: [
          "You may use this website for legitimate informational and professional purposes. You must not use it for unlawful activities or in ways that affect its operation.",
        ],
      },
      {
        title: "3. Intellectual property",
        body: [
          "Unless stated otherwise, the texts, design, brand and materials on this website belong to Gleam Peak AI or are used with permission.",
        ],
      },
      {
        title: "4. Informational nature",
        body: [
          "The products described, including Trust Gateway, are prototypes in development. The information on this website is general, is not a commercial offer and does not imply that using them is enough to comply with any regulation.",
        ],
      },
      {
        title: "5. External links",
        body: [
          "The website may include links to third-party platforms. We are not responsible for their content or practices.",
        ],
      },
      {
        title: "6. Liability",
        body: [
          "To the extent permitted by law, Gleam Peak AI is not liable for indirect damages arising from the use of the website.",
        ],
      },
      {
        title: "7. Changes and governing law",
        body: [
          "We may update these terms. The version in force is the one published on this page. They are governed by Spanish law.",
        ],
      },
    ],
  },
};
