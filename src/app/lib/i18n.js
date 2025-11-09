import { createContext, useContext, useState, useEffect } from 'react';

const I18nContext = createContext();

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    // Fallback if context is not available
    return {
      t: (key) => key,
      locale: 'ar',
      setLocale: () => {},
      direction: 'rtl'
    };
  }
  return context;
};

const translations = {
  ar: {
    contactUs: "اتصل بنا",
    aboutUs: "من نحن",
    bestPrices: "افضل الاسعار",
    fastestDelivery: "اسرع توصيل",
    searchPlaceholder: "واش راكي تدوّري عليه؟",
    search: "بحث",
    favorites: "المفضلة",
    myAccount: "حسابي",
    login: "تسجيل دخول",
    products: "منتجات",
    cart: "السلة",
    noCategories: "لا توجد تصنيفات متاحة",
    closeMenu: "إغلاق القائمة",
    seeMore: "شاهد المزيد",
    discoverProducts: "اكتشف أفضل المنتجات اليوم!",
    // Cart translations
    emptyCart: "سلة فارغة",
    browseProducts: "تصفح المنتجات و أضفها للمتابعة",
    baseTotal: "الإجمالي الاساسي",
    saved: "تم توفير",
    shipping: "الشحن",
    total: "الإجمالي",
    proceedToCheckout: "المتابعة للدفع",
    guestCheckout: "المتابعة كضيف",
    removeFromFavorites: "تمت إزالة المنتج من المفضلة",
    // About page translations
    aboutCompany: "حول الشركة",
    aboutCompanyText: "نحن علامة تجارية دولية متخصصة في ملابس النساء والأطفال، بنينا سمعتنا على الجودة العالية والتصاميم المبتكرة على مدار سنوات عديدة. يثق عملاؤنا بنا لما نقدمه من أقمشة ممتازة، وخياطة متقنة، وأفكار متجددة في تصميماتنا. لدينا قاعدة عملاء سعيدة في أكثر من 10 دول حول العالم. على مدار السنين، ركزنا على تحسين الجودة باستمرار وتقديم منتجات تلبي احتياجات وتطلعات أسلوب حياة عملائنا.",
    ourHistory: "تاريخنا",
    ourHistoryBold: "أكثر من 10 دول على مر السنين مع أكثر من 40 عامًا من الخبرة في مجال الملابس.",
    ourHistoryText: "لدينا أكثر من 40 عامًا من الخبرة في مجال الملابس، مما مكننا من التوسع والوصول إلى أكثر من 10 دول. بدأنا رحلتنا في تجارة الملابس قبل 40 عامًا بدافع شغفنا بهذا المجال، مما ساعدنا على النمو والاستمرارية. تأسست علامتنا التجارية Minimoon قبل 14 عامًا، مستندة إلى شغفنا بالجودة والأناقة. التزامنا بتلبية احتياجات المستهلكين ومواكبة أنماط الحياة المتغيرة كان أساس نجاحنا. نحن نصغي لعملائنا بعناية ونسعى دائمًا لتقديم ما يتناسب مع تطلعاتهم المتجددة.",
    ourProducts: "منتجاتنا",
    qualityAndValues: "لدينا الجودة والتركيز على القيم",
    qualityText: "نحن نؤمن بأن الجودة لا تقتصر فقط على المنتج، بل تمتد لتشمل التجربة التي يقدمها. هذا ينطبق بشكل خاص على الملابس، حيث تُعتبر الراحة التي يشعر بها الشخص جزءًا لا يتجزأ من تجربة الحياة اليومية. نحن نسعى جاهدين لتقديم منتجات ذات جودة عالية تجعل حياة عملائنا أكثر راحة ورفاهية. في الوقت ذاته، نؤمن أن الجودة لا يجب أن تكون مكلفة. يثق عملاؤنا في علامتنا التجارية لما نقدمه من قيمة استثنائية تجمع بين الجودة والسعر المناسب. هذه الثقة هي نتاج تجربة مميزة اكتسبناها على مر السنين، ونحن فخورون بقاعدة عملائنا المخلصين الذين يشاركونا رحلتنا. علاوة على ذلك، نقدم لعملائنا مجموعة واسعة من الخيارات التي تناسب مختلف الأذواق والميزانيات، مما يضمن تلبية احتياجات الجميع من خلال التنوع والمرونة.",
    childrenDesigns: "تصاميمنا للأطفال مستوحاة من",
    womenDesigns: "تصاميمنا للنساء مستوحاة من",
    curiosity: "حب الاستطلاع",
    fun: "المزاح",
    innocence: "البراءة",
    creativity: "الإبداع",
    passion: "الشغف",
    care: "الاهتمام",
    selfAffirmation: "التأكيد الذاتي",
    tenderness: "الرقة والحنان",
    individuality: "الفردية",
    ourDesigns: "تصاميمنا",
    designsText: "بالنسبة لنا، الأزياء هي انعكاس للتجربة الجماعية التي يمر بها الناس عبر الثقافات، حيث يعبرون عن البهجة وحتى الفوضى من خلال أنماط وألوان مميزة. نتابع عن كثب الاتجاهات التي تلهم بأساليب جديدة، لأن في ذلك تكمن روح التصاميم المبتكرة. نحن نسعى دائمًا لإبهار عملائنا بتصاميم تعكس الجمال والإبداع. نستلهم أعمالنا من الحياة اليومية، والاتجاهات الحديثة، والثقافات المختلفة، لأننا نرى الجمال في كل مكان من حولنا. نؤمن أن عيون الإنسان مصممة لتلتقط هذا الجمال وتتفاعل معه بإعجاب. نعلم أن عملاءنا يسعون للتعبير عن أسلوب حياتهم ومواقفهم وقيمهم من خلال ملابسهم. لذلك، يعمل فريق مصممينا بلا كلل على استلهام الأفكار وابتكار تصاميم فريدة وجذابة تلبي احتياجاتهم. نحن فخورون بتقديم أكثر من 365 موضوع تصميم جديد كل عام، مما يضمن لعملائنا مجموعة متنوعة ومتجددة دائمًا من الخيارات التي تلبي أذواقهم وتطلعاتهم.",
    marketsWeServe: "الأسواق التي نخدمها",
    marketsText: "على الرغم من أننا بدأنا بأسواق صغيرة ولكن على مدار سنوات، فقد ساعدنا جودة عملائنا في توسيع نطاق أعمالنا إلى العديد من البلدان. نحن نبيع منتجاتنا في معظم البلدان في الشرق الأوسط وشمال إفريقيا. لدينا العديد من العملاء الراضين التي طورنا عليها على مدار سنوات. نحن نوسع أوروبا ودول أخرى. كما نحب أن نسمع منك",
    // ProductFeat translations
    bestSections: "أفضل الأقسام",
    viewAllProducts: "مشاهدة كل المنتجات"
  },
  fr: {
    contactUs: "Contactez-nous",
    aboutUs: "À propos de nous",
    bestPrices: "Meilleurs prix",
    fastestDelivery: "Livraison la plus rapide",
    searchPlaceholder: "Que cherchez-vous?",
    search: "Rechercher",
    favorites: "Favoris",
    myAccount: "Mon compte",
    login: "Se connecter",
    products: "produits",
    cart: "Panier",
    noCategories: "Aucune catégorie disponible",
    closeMenu: "Fermer le menu",
    seeMore: "Voir plus",
    discoverProducts: "Découvrez les meilleurs produits aujourd'hui!",
    // Cart translations
    emptyCart: "Panier vide",
    browseProducts: "Parcourez les produits et ajoutez-les pour continuer",
    baseTotal: "Total de base",
    saved: "Économisé",
    shipping: "Livraison",
    total: "Total",
    proceedToCheckout: "Passer à la caisse",
    guestCheckout: "Continuer en tant qu'invité",
    removeFromFavorites: "Produit retiré des favoris",
    // About page translations
    aboutCompany: "À propos de l'entreprise",
    aboutCompanyText: "Nous sommes une marque internationale spécialisée dans les vêtements pour femmes et enfants. Nous avons construit notre réputation sur une qualité élevée et des designs innovants au fil des années. Nos clients nous font confiance pour la qualité des tissus que nous proposons, la couture ainsi que la fraîcheur que nous apportons dans nos designs. Nous avons des clients satisfaits dans plus de 10 pays. Au fil des années, nous nous sommes efforcés d'améliorer continuellement la qualité et de livrer des produits qui répondent aux besoins du mode de vie de nos clients.",
    ourHistory: "Notre histoire",
    ourHistoryBold: "Plus de 10 pays au fil des années avec plus de 40 ans d'expérience dans l'industrie du vêtement.",
    ourHistoryText: "Nous sommes dans le commerce du vêtement depuis 40 ans. C'est notre amour pour les vêtements qui nous a aidés à continuer et à grandir dans cette entreprise. Notre marque minimoon a été fondée il y a 14 ans. La marque a été poussée par la passion avec l'engagement envers la qualité et l'élégance. Nous avons répondu à la demande des consommateurs et au changement de mode de vie. Nous écoutons nos clients de près et cherchons constamment à répondre aux besoins changeants de leur mode de vie.",
    ourProducts: "Nos produits",
    qualityAndValues: "Nous avons la qualité et l'accent sur les valeurs",
    qualityText: "Nous pensons que la qualité ne concerne pas seulement le produit mais aussi son expérience. C'est particulièrement vrai pour les vêtements car le confort que l'on obtient des vêtements fait partie de l'expérience globale et intime de la qualité de vie. En même temps, nous pensons que la qualité ne doit pas être chère. Nos clients font confiance à notre marque en raison de la valeur exceptionnelle qu'ils obtiennent. Cette confiance vient uniquement de l'expérience, et nous sommes fiers de nos clients fidèles. Nos clients ont également un grand choix pour choisir des vêtements pour chaque budget.",
    childrenDesigns: "Nos designs pour enfants sont inspirés de",
    womenDesigns: "Nos designs pour femmes sont inspirés de",
    curiosity: "Curiosité",
    fun: "Plaisanterie",
    innocence: "Innocence",
    creativity: "Créativité",
    passion: "Passion",
    care: "Attention",
    selfAffirmation: "Affirmation de soi",
    tenderness: "Tendresse et douceur",
    individuality: "Individualité",
    ourDesigns: "Nos designs",
    designsText: "La mode pour nous est une représentation de l'expérience collective que les gens traversent à travers les cultures et choisissent d'exprimer la joie et le chaos dans un certain style et couleurs. Nous continuons à suivre de près les tendances qui inspirent de nouvelles façons, car c'est là que réside l'esprit des designs. Nous sommes constamment poussés à émerveiller nos clients. Nous sommes inspirés par la vie, les tendances et la culture. Nous voyons la beauté partout. Nous croyons que les yeux humains sont conçus pour capturer et admirer la beauté. Nous savons aussi que nos clients ont besoin d'exprimer leur mode de vie, leur attitude et leurs valeurs à travers les vêtements. Par conséquent, nos designers cherchent constamment l'inspiration pour créer des designs beaux et distinctifs qui guideront nos clients. Nous disons avec fierté que nous proposons plus de 365 thèmes de design chaque année.",
    marketsWeServe: "Les marchés que nous servons",
    marketsText: "Bien que nous ayons commencé avec de petits marchés mais au fil des années, la qualité de nos clients nous a aidés à étendre nos activités à de nombreux pays. Nous vendons nos produits dans la plupart des pays du Moyen-Orient et d'Afrique du Nord. Nous avons de nombreux clients satisfaits que nous avons développés au fil des années. Nous nous développons en Europe et dans d'autres pays. Nous aimerions aussi vous entendre",
    // ProductFeat translations
    bestSections: "Meilleures Sections",
    viewAllProducts: "Voir tous les produits"
  },
  en: {
    contactUs: "Contact Us",
    aboutUs: "About Us",
    bestPrices: "Best Prices",
    fastestDelivery: "Fastest Delivery",
    searchPlaceholder: "What are you looking for?",
    search: "Search",
    favorites: "Favorites",
    myAccount: "My Account",
    login: "Login",
    products: "products",
    cart: "Cart",
    noCategories: "No categories available",
    closeMenu: "Close menu",
    seeMore: "See more",
    discoverProducts: "Discover the best products today!",
    // Cart translations
    emptyCart: "Empty Cart",
    browseProducts: "Browse products and add them to continue",
    baseTotal: "Base Total",
    saved: "Saved",
    shipping: "Shipping",
    total: "Total",
    proceedToCheckout: "Proceed to Checkout",
    guestCheckout: "Continue as Guest",
    removeFromFavorites: "Product removed from favorites",
    // About page translations
    aboutCompany: "About the Company",
    aboutCompanyText: "We are an international brand specializing in women's and children's clothing. We have built our reputation for high quality and innovative designs over the years. Our clients trust us for the quality we provide in terms of fabric, sewing as well as the freshness we bring in our design. We have happy customers in more than 10 countries. Over the years, we have been striving to continuously improve quality and deliver products that meet our customers' lifestyle needs.",
    ourHistory: "Our History",
    ourHistoryBold: "More than 10 countries over the years with more than 40 years of experience in the clothing industry.",
    ourHistoryText: "We have been in the clothing trade for 40 years. It is our love for clothing that has helped us to continue and grow in this business. Our minimoon brand was founded 14 years ago. The brand was driven by passion with commitment to quality and elegance. We have responded to consumer demand and changing lifestyle. We listen to our customers closely and constantly seek to meet their changing lifestyle needs.",
    ourProducts: "Our Products",
    qualityAndValues: "We Have Quality and Focus on Values",
    qualityText: "We believe that quality is not just about the product but also about its experience. This is particularly true for clothing because the comfort one gets from clothing is part of the overall, intimate experience of quality of life. At the same time, we believe that quality should not be expensive. Our customers trust our brand because of the exceptional value they get. This trust comes only from experience, and we are proud of our loyal customers. Our customers also get a great choice to choose clothing for every budget.",
    childrenDesigns: "Our Designs for Children are Inspired by",
    womenDesigns: "Our Designs for Women are Inspired by",
    curiosity: "Curiosity",
    fun: "Fun",
    innocence: "Innocence",
    creativity: "Creativity",
    passion: "Passion",
    care: "Care",
    selfAffirmation: "Self-Affirmation",
    tenderness: "Tenderness and Gentleness",
    individuality: "Individuality",
    ourDesigns: "Our Designs",
    designsText: "Fashion for us is a representation of the collective experience that people go through across cultures and choose to express joy and chaos in a certain style and colors. We continue to follow trends closely that inspire in new ways, because there lies the spirit of designs. We are constantly driven to amaze our customers. We are inspired by life, trends, and culture. We see beauty everywhere. We believe that human eyes are designed to capture and admire beauty. We also know that our customers need to express their lifestyle, attitude, and values through clothing. Therefore, our designers constantly seek inspiration to come up with beautiful and distinctive designs that will guide our customers. We proudly say that we offer more than 365 design themes every year.",
    marketsWeServe: "Markets We Serve",
    marketsText: "Although we started with small markets but over the years, our customers' quality has helped us expand our business to many countries. We sell our products in most countries in the Middle East and North Africa. We have many satisfied customers that we have developed over the years. We are expanding Europe and other countries. We would also love to hear from you",
    // ProductFeat translations
    bestSections: "Best Sections",
    viewAllProducts: "View All Products"
  }
};

export const I18nProvider = ({ children, defaultLocale = 'ar' }) => {
  const [locale, setLocaleState] = useState(defaultLocale);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedLocale = localStorage.getItem('locale');
        if (savedLocale && translations[savedLocale]) {
          setLocaleState(savedLocale);
        }
      }
    } catch (err) {
      console.error('Error loading locale from localStorage:', err);
    }
  }, []);

  const changeLocale = (newLocale) => {
    try {
      if (translations[newLocale]) {
        setLocaleState(newLocale);
        if (typeof window !== 'undefined') {
          localStorage.setItem('locale', newLocale);
        }
      } else {
        console.warn(`Locale ${newLocale} not supported`);
      }
    } catch (err) {
      console.error('Error changing locale:', err);
    }
  };

  const t = (key) => {
    try {
      return translations[locale]?.[key] || key;
    } catch (err) {
      console.error('Error translating key:', err, key);
      return key;
    }
  };

  // Get direction based on locale
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  // Update document direction when locale changes
  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('dir', direction);
        document.documentElement.setAttribute('lang', locale);
      }
    } catch (err) {
      console.error('Error setting document direction:', err);
    }
  }, [locale, direction]);

  return (
    <I18nContext.Provider value={{ t, locale, setLocale: changeLocale, direction }}>
      {children}
    </I18nContext.Provider>
  );
};

