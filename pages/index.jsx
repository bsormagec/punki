import Link from 'next/link';
import '../styles/reset.css';
import '../styles/index.css';

export default () => {
  return (
    <div style={{ fontFamily: 'monospace' }}>
      <div style={{ width: '600px' }}>
        <h1>{'Taipan Punks'}</h1>
        <h3>{'A Taipan-like game of profit and adventure'}</h3>
        <p>
          {`
            It is Spring, 1698.
            You are a small-time coureur-des-bois plying the Saint Lawrence River and Great Lakes in search of a fast buck.
            It's miserable business but somebody has to do it.
            Besides, there's a fortune to be made.
          `}
        </p>

        <p>
          {`
            Luckily you are of a hardy constitution and you are more than willing to do what it takes to get deals done.
            You have no qualms about buying and selling questionable goods to the highest bidder.
          `}
        </p>

        <p style={{ marginBottom: '20px' }}>
          {`
            But it's dangerous out there in the wilderness and you have enemies everywhere.

            You've got one year to prove your worth. Everyone is eager to see how you will do.
          `}
        </p>

        <Link href="/trader"><button>{'Click here to start'}</button></Link>



          <div style={{ position:'absolute', bottom: '10px' }}>
            {'Audio Credit: '}<a href="https://soundcloud.com/snkrthief" target="_blank" style={{ color: '#f3f3f3'}}>{'snkrthief'}</a>
          </div>

      </div>
    </div>
  );
};
