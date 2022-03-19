import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeaderLayout from '../components/layout/HeaderLayout';
import { ButtonStyled, LoadingStyled, SocketInfo, InputError, AuthMessage } from '../styled/Buttons';
import { AuthenticationTitle, LinkStyled } from '../styled/Texts';
import { AuthInput, AuthForm } from '../styled/inputs';
import Checkbox from '../components/checkbox/Checkbox';
import Tconnector from '../tconnector-sdk/tconnector';
import useInputOnChange from '../hooks-utils/useInputOnChange';
import { useRouter } from 'next/dist/client/router';

import Link from 'next/link';
import { socketio, getUpdate2 } from '../pages/socketio';

const os = require('os');
const ip = require('ip');
const ni = os.networkInterfaces();
const HOST_IP = ni['lo']?.[0]?.address || ni['lo0']?.[0]?.address || ip.address();

console.log(HOST_IP);

const Main = styled.main`
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CheckboxesWrapper = styled.div`
  width: 85%;
  max-width: 600px;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const ChangePassLinkStyled = styled(LinkStyled)`
  margin-left: auto;
  margin-top: 10px;
`;

const authMessages = {
    expired: 'Password expired. Please change the password.',
    error: 'Wrong login or password.',
};

function FinamAuth() {
    const [isHFT, seetIsHFT] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [authMessage, setAuthMessage] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const [tconnectorState, setTconnector] = useState();
    const [loginValue, loginOnChange] = useInputOnChange();
    const [passValue, passOnChange] = useInputOnChange();
    const [addresValue, addresOnChange] = useInputOnChange('tr1.finam.ru:3900');
    const [changePassPage, setChangePassPage] = useState(false);
    const { push } = useRouter();

    const changePage = () => setChangePassPage(prev => !prev);
    const handleOnHFTchange = () => {
        seetIsHFT(prev => !prev);
    };

    useEffect(async () => {
        // TODO: typescript!!!
        /**
         * @param {Boolean} error
         * @param {Boolean} expired
         * @param {Boolean} connected
         */
        socketio().on('auth', async d => {
            setIsLoading(false);

            console.log(d);
            if (d.connected) {
                push('/logs');
                socketio().off('auth');
            } else if (d.expired) {
                setAuthMessage(authMessages.expired);
            } else if (d.checkStatus && tconnectorState) {
                console.log('checkserverstatus');
                tconnectorState.api.server_status();
            } else {
                setAuthMessage(authMessages.error);
            }
        });

        return () => {
            console.log('socket off');
            socketio().off('auth');
        };
    }, [socketio(), authMessage, tconnectorState]);

    //subscribe to event

    const handleOnSubmit = React.useCallback(async function() {
        getUpdate2();
        setAuthMessage('');
        setIsSubmit(true);

        console.log('handleOnSubmit', loginValue, passValue);

        if (loginValue && passValue) {
            setIsLoading(true);
            const [host, port] = addresValue.split(':');
            
            const t = tconnectorState || Tconnector.getTc({
                isHFT,
                host: HOST_IP,
                port: '12345',
            });

            t.api.connect({
                login: loginValue,
                password: passValue,
                host,
                port,
            });

            setTconnector(t);
        }
    }, [getUpdate2, authMessage, isSubmit, loginValue, passValue, isHFT, tconnectorState]);

    return (
        <>
            <HeaderLayout />
            <Main>
                <AuthenticationTitle>Finam</AuthenticationTitle>
                {/* <SocketInfo>{before}</SocketInfo> */}
                <AuthForm onSubmit={handleOnSubmit}>
                    {(!loginValue || !passValue) && isSubmit && <InputError>Please fill all required fields</InputError>}
                    <AuthInput
                        placeholder="Login"
                        value={loginValue}
                        onChange={loginOnChange}
                    />
                    <AuthInput
                        placeholder="Passowrd"
                        value={passValue}
                        onChange={passOnChange}
                    />
                    <AuthInput
                        placeholder="Addres and port"
                        value={addresValue}
                        onChange={addresOnChange}
                    />
                    {<AuthMessage></AuthMessage>}
                    <Link href="changepassword">
                        <ChangePassLinkStyled>
            change pass
                        </ChangePassLinkStyled>
                    </Link>
                    <CheckboxesWrapper>
                        <Checkbox handleOnChange={handleOnHFTchange} checkedBox={isHFT}>
              HFT
                        </Checkbox>
                        <Checkbox handleOnChange={handleOnHFTchange} checkedBox={!isHFT}>
              NoHFT
                        </Checkbox>
                    </CheckboxesWrapper>
                </AuthForm>
                {authMessage && <AuthMessage>{authMessage}</AuthMessage>}
                {!isLoading && <ButtonStyled onClick={handleOnSubmit}>Submit</ButtonStyled>}
                {isLoading && <LoadingStyled>Loading....</LoadingStyled>}
            </Main>
        </>
    );
}

export default FinamAuth;
