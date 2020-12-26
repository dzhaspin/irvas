import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');

     checkNumInputs('input[name="user_phone"]');
     // Вводить только цифры телефона

    // Сообщение
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо, данные оправлены!',
        failure: 'Что-то пошло не так...'
    };

    // Функция отправки запроса
    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    // Функция очистки input
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    // Перебираем все Формы
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            // Создаем блок с сообщениями
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            // Собираем все данные из этой Формы
            const formData = new FormData(item);
            if(item.getAttribute('data-calc') === "end") {
                for(let key in state) {
                    formData.append(key, state[key]);
                }
            }

            // Отправляем запрос на сервер c данными formData
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });
};

export default forms;