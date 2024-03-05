export const formatCheckoutFields = (e) => {
        let formattedValue = '';
        let inputValue = e.target.value;

        e.target.value =  inputValue 

        switch (e.target.id) {
            case 'name':                
                 e.target.value = inputValue.replace(/[^a-zA-Z\s]/g, '');
                break;

            case 'city':                
                e.target.value = inputValue.replace(/[^a-zA-Z\s]/g, '');
                break;

            case 'credit-card':
                e.target.value = inputValue.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
                break;

            case 'expiration':
                formattedValue = inputValue.replace(/\D/g, '');
                formattedValue = formattedValue.slice(0, 6); 
                if (formattedValue.length > 2) {
                    formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
                }
                e.target.value = formattedValue;
                break;

            case 'cvv':
                formattedValue = inputValue.replace(/\D/g, ''); 
                formattedValue = formattedValue.slice(0, 4); 
                e.target.value = formattedValue;
                break;

            case 'street-1':
                e.target.value = inputValue.replace(/[^a-zA-Z0-9\s]/g, '');
                break;

            case 'street-2':
                e.target.value = inputValue.replace(/[^a-zA-Z0-9\s]/g, '');
                break;

            case 'zip':
                e.target.value = inputValue.replace(/\D/g, '').slice(0, 5);
                break;

            case 'email':
                e.target.value = inputValue.replace(/[^a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/g, '');
                break;

            case 'phone':
                e.target.value = inputValue.replace(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "($1)$2-$3");      
                break;
        }
}