import {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Button from '../ui/Button';
import Input from './Input';
import {credentialsValidType} from './AuthContent';

type AuthFormProps = {
    isLogin: boolean | undefined,
    onSubmit: ({email, confirmEmail, password, confirmPassword}: {
        email: string,
        confirmEmail: string,
        password: string,
        confirmPassword: string
    }) => void,
    credentialsInvalid: credentialsValidType
}

function AuthForm({isLogin, onSubmit, credentialsInvalid}: AuthFormProps) {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

    const {
        email: emailIsInvalid,
        confirmEmail: emailsDontMatch,
        password: passwordIsInvalid,
        confirmPassword: passwordsDontMatch,
    } = credentialsInvalid;

    const updateInputValueHandler

        = (inputType: string, enteredValue: string) => {
        switch (inputType) {
            case 'email':
                setEnteredEmail(enteredValue);
                break;
            case 'confirmEmail':
                setEnteredConfirmEmail(enteredValue);
                break;
            case 'password':
                setEnteredPassword(enteredValue);
                break;
            case 'confirmPassword':
                setEnteredConfirmPassword(enteredValue);
                break;
        }
    }

    function submitHandler() {
        onSubmit({
            email: enteredEmail,
            confirmEmail: enteredConfirmEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
        });
    }

    return (
        <View style={styles.form}>
            <View>
                <Input
                    label="Email Address"
                    onUpdateValue={updateInputValueHandler.bind({}, 'email')}
                    value={enteredEmail}
                    keyboardType="email-address"
                    isInvalid={emailIsInvalid}
                />
                {!isLogin && (
                    <Input
                        label="Confirm Email Address"
                        onUpdateValue={updateInputValueHandler.bind({}, 'confirmEmail')}
                        value={enteredConfirmEmail}
                        keyboardType="email-address"
                        isInvalid={emailsDontMatch}
                    />
                )}
                <Input
                    label="Password"
                    onUpdateValue={updateInputValueHandler.bind({}, 'password')}
                    secure
                    value={enteredPassword}
                    isInvalid={passwordIsInvalid}
                />
                {!isLogin && (
                    <Input
                        label="Confirm Password"
                        onUpdateValue={updateInputValueHandler.bind(
                            {},
                            'confirmPassword'
                        )}
                        secure
                        value={enteredConfirmPassword}
                        isInvalid={passwordsDontMatch}
                    />
                )}
                <View style={styles.buttons}>
                    <Button onPress={submitHandler}>
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </Button>
                </View>
            </View>
        </View>
    );
}

export default AuthForm;

const styles = StyleSheet.create({
    buttons: {
        marginTop: 12,
    },
    form: {}
});
