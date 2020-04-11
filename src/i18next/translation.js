// import React from 'react';
// import { withTranslation } from 'react-i18next';


// function MyComponent({ t, i18n }) {
//     return <p onClick={()=> changeLanguage(i18n)}>{t('my translated text')}</p>
// }

// export default withTranslation()(MyComponent);

import React from 'react';
import { useTranslation } from 'react-i18next';

export default function MyComponent() {
    const { t, i18n } = useTranslation();
    const changeLanguage = () => {
        i18n.changeLanguage("chi")
    }
    return <p onClick={()=> changeLanguage()}>{t('my translated text')}</p>
}
