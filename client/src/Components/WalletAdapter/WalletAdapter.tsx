import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import {ConnectionProvider, useWallet, WalletProvider} from "@solana/wallet-adapter-react";
import {WalletModalProvider, WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {
    GlowWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
    UnsafeBurnerWalletAdapter
} from "@solana/wallet-adapter-wallets";
import {clusterApiUrl} from "@solana/web3.js";
import React, {FC, ReactNode, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GlobalVariablesAction} from "../../Store/GlobalVariables";
import solanaIcon from '../../icons/solana.svg';
import done from '../../icons/done.svg';

require("./WalletAdapter.css");
require("@solana/wallet-adapter-react-ui/styles.css");

const App: FC = () => {
    return (
        <Context>
            <Content/>
        </Context>
    );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({children}) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new UnsafeBurnerWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter(),
            new TorusWalletAdapter(),
            new SolletExtensionWalletAdapter(),
            new SolletWalletAdapter()
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {
    const {publicKey, disconnect, connected} = useWallet();
    const [location, setLocation] = useState(false)

    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (connected === true) {
            dispatch(GlobalVariablesAction.setWalletAddress(base58))
            dispatch(GlobalVariablesAction.setWalletSelected(true))
        }else{
            dispatch(GlobalVariablesAction.setWalletSelected(false))
        }
    }, [connected]);

    useEffect(() => {
        if(window.location.pathname === "/auth/verify-ownership") setLocation(true)
    })

    return (
        <>
            <div className="wallet-adapter-container" style={{height: "fit-content"}}>
                <WalletMultiButton>
                    {
                        location && (
                            <>
                                <img src={done} alt="solana" style={{marginRight: "16px"}} />
                                <span>Verify wallet ownership</span>
                            </>
                        )
                    }

                    {
                        (!connected && !location)  && <>
                            <img src={solanaIcon} alt="solana" style={{marginRight: "16px"}} />
                            <span>Link Wallet</span>
                        </>
                    }
                </WalletMultiButton>
            </div>
        </>
    );
};
