import { all_input, fullnamePattern, emailPattern } from './elements.js';
import { PropertyRequiredError, EmptyValueError, IncorrectValueError, NetworkError, ServerError } from './errors.js';

export function getUserData() {
    let data = {};

    all_input.forEach((input) => {
        data[input.name] = (input.type !== "checkbox") ? input.value : input.checked;
    });

    try {
        validateUserData(data);

        return data;
    } catch (errors) {
        if (Array.isArray(errors)) {
            errors.forEach(error => {
                if (error instanceof PropertyRequiredError) {
                    console.log("Ошибка работы алгоритма сбора данных из формы, отсутсвует свойство: ", error.property);
                } else if (error instanceof EmptyValueError || error instanceof IncorrectValueError) {
                    let error_input = [...all_input].find((input) => input.name === error.property);

                    error_input.classList.add("is-invalid");

                    if (!error_input.nextElementSibling || !error_input.nextElementSibling.classList.contains("invalid-feedback")) {
                        let div = document.createElement('div');
                        div.className = "invalid-feedback";
                        div.innerHTML = error.message;
                        error_input.after(div);
                    }
                } else {
                    alert("Возникла ошибка, повторите действие позже");
                    console.log("Неизвестная ошибка: " + error.name);
                }
            });
        }
        return null;
    } finally {
        console.log("Валидация завершена");
    }
}

export function validateUserData(data) {
    console.log(data);
    let errors = [];

    const requiredProps = ["fullname", "phone", "email", "mailing", "approval"];
    requiredProps.forEach(prop => {
        if ( !data.hasOwnProperty(prop) ) {
            errors.push(new PropertyRequiredError(prop));
        }
    });

    const nonEmptyProps = ["fullname", "phone", "email"];
    nonEmptyProps.forEach(prop => {
        if (!data[prop]) {
            errors.push(new EmptyValueError(prop));
        }
    });

    if (!data.approval) {
        errors.push(new IncorrectValueError("Вы должны принять условия", "approval"));
    }

    if (data.fullname) {
        if (data.fullname.split(" ").length < 2) {
            errors.push(new IncorrectValueError("Укажите фамилию и имя через пробел", "fullname"));
        } else if (!fullnamePattern.test(data.fullname)) {
            errors.push(new IncorrectValueError("Можно использовать только буквы, пробелы и дефисы", "fullname"));
        }
    }

    if (data.phone) {
        let phone = data.phone.replace(/\D/g, "").slice(1);
        if (phone.length !== 10) {
            errors.push(new IncorrectValueError("Номер телефона должен содержать 11 цифр", "phone"));
        }
    }

    if (data.email) {
        if (!emailPattern.test(data.email)) {
            errors.push(new IncorrectValueError("Введите корректный email", "email"));
        }
    }

    if (errors.length > 0) {
        throw errors;
    }

    return true;

}