// Function to format the message as HTML
export function formatNewMarketsHTMLMessage(newMarkets: any[]): string {
  // Group markets by network
  const marketsByNetwork = newMarkets.reduce(
    (acc: Record<string, any[]>, market) => {
      const { network, marketInfo } = market;
      if (!acc[network]) {
        acc[network] = [];
      }
      acc[network].push(marketInfo);
      return acc;
    },
    {}
  );

  // Build the HTML message
  let htmlMessage = `
    <html>
    <head>
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
        }
      </style>
    </head>
    <body>
      <h3>New Markets Detected</h3>
      <p>The following new markets have been detected and are not currently monitored:</p>
  `;

  (Object.entries(marketsByNetwork) as [string, any[]][]).forEach(
    ([network, markets]) => {
      htmlMessage += `
      <h4>Network ID: ${network}</h4>
      <table>
        <thead>
          <tr>
            <th>Market Symbol</th>
            <th>Market Address</th>
          </tr>
        </thead>
        <tbody>
    `;

      markets.forEach((marketInfo) => {
        htmlMessage += `
        <tr>
          <td>${marketInfo.baseSymbol}</td>
          <td>${marketInfo.cometAddress}</td>
        </tr>
      `;
      });

      htmlMessage += `
        </tbody>
      </table>
      <br/>
    `;
    }
  );

  htmlMessage += `
    </body>
    </html>
  `;

  return htmlMessage;
}
