import * as Yup from 'yup';

const AdocoesValidator = Yup.object().shape({

    // Definindo o esquema de validação com Yup
    nome: Yup.string().required('Nome é obrigatório'),
    animais: Yup.string().required('Pet é obrigatório'),
    // data_adocao: Yup.string().when('status_adocao', {
    //     is: 'concluída',
    //     then: Yup.string().required('Data da adoção é obrigatória'),
    //     otherwise: Yup.string().nullable(),
    //}),
    status_adocao: Yup.string().required('Status é obrigatório'),
});
export default AdocoesValidator