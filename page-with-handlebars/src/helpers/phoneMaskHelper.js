import vanillaTextMask from 'vanilla-text-mask';
import textMaskAddons from 'text-mask-addons';

const applyPhoneMask = (inputElement) => {
    const phoneMask = vanillaTextMask.createTextMaskInputElement({
        inputElement: inputElement,
        mask: [
            '(',
            /[1-9]/,
            /\d/,
            ')',
            ' ',
            '9',
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            /\d/,
            /\d/
        ],
        guide: false
    });

    inputElement.addEventListener('input', () => {
        phoneMask.update();
    });
}
export default applyPhoneMask