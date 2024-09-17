import { Address, toNano } from '@ton/core';
import { SampleJetton } from '../wrappers/SampleJetton';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from '../utils/jetton-helpers';

export async function run(provider: NetworkProvider) {
    const jettonParams = {
        name: "Bitcoin Cash",
        description: "Low fee peer-to-peer electronic cash alternative to Bitcoin",
        symbol: "BCH",
        image: "https://lime-biological-possum-658.mypinata.cloud/ipfs/QmWdriCtshQczjAZjKBzXiTsgRKXYCzebmeD8AFMER3Ey4",
    };

    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);

    const sampleJetton = provider.open(await SampleJetton.fromInit(provider.sender().address as Address, content, 21000000000000000n));

    await sampleJetton.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Mint',
            amount: 21000000000000000n,
            receiver: provider.sender().address as Address
        }
    );

    await provider.waitForDeploy(sampleJetton.address);

    // run methods on `sampleJetton`
}
