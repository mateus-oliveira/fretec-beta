import React, {Suspense, lazy} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

const Home  = lazy(()=> import('./pages/Home'));


export default function Routes(){

    return (
        <BrowserRouter>
            <Switch>
                <Suspense fallback={<div>Aguarde...</div>}>
                    <Route path="/" exact component={Home} />
                </Suspense >
            </Switch>
        </BrowserRouter>
    );
};