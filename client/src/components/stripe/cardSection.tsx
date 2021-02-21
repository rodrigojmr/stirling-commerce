import { CardElement, CardElementProps } from '@stripe/react-stripe-js';
import { CustomTheme } from 'theme/theme';

const CARD_ELEMENT_OPTIONS: CardElementProps['options'] = {
  iconStyle: 'solid',
  hidePostalCode: true,
  style: {
    base: {
      padding: '1rem',
      backgroundColor: 'transparent',
      iconColor: CustomTheme.colors.primary['500'],
      color: CustomTheme.colors['grey'],
      fontSize: '16px',
      fontFamily: '"Open Sans", sans-serif',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#CFD7DF'
      }
    },
    invalid: {
      color: '#e5424d',
      ':focus': {
        color: CustomTheme.colors.red['100']
      }
    }
  }
};

const CardSection = () => {
  return <CardElement options={CARD_ELEMENT_OPTIONS} />;
};

export default CardSection;
