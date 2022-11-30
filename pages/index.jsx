import Link from 'next/link';
import '../styles/reset.css';
import '../styles/index.css';

export default () => {
  return (
    <div style={{ fontFamily: 'monospace' }}>
      <div style={{ width: '90vw' }}>
        <h1>{'Nomadic Punks Trader'}</h1>
        <h3>{'A Taipan-like game of profit and adventure in a nomadic world of tribes.'}</h3>
        <p>
          {`
            It is Spring, 2023.
            You belong to a nomadic tribe.
            You travel, trade and profit.
            And there's a fortune to be made.
          `}
        </p>

        <p>
          {`
            Prove your trading skills in a dynamic market.
          `}
        </p>

        <p style={{ marginBottom: '20px' }}>
          {`
            But it's dangerous out there in the wilderness and you have rivals.
            
            Who are more than willing to fight for the same fortune.
          `}
        </p>

        <Link href="/trader"><button>{'Play'}</button></Link>



          <div style={{ position:'absolute', bottom: '10px' }}>
            {'Docs: '}<a href="https://github.com/PagziTechInc/punki/" target="_blank" style={{ color: '#f3f3f3'}}>{'docs'}</a>
          </div>

      </div>
    </div>
  );
};
