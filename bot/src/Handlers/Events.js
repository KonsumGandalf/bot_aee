const Events = require( "../Validation/EventNames");

module.exports = async (client, pg, Ascii) => {
  const Table = new Ascii("Events loaded");

  (await pg(`${process.cwd()}/src/Events/*/*.js`)).map(async (file) => {
    const event = require(file);
    if (!Events.includes(event.name) || !event.name) {
      const L = file.split("/");
      await Table.addRow(`${event.name || "MISSING"}`, `🛑 EventName is invalid or missing: ${L[6] + `/` + L[7]}`);
      return;
    }

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }

    await Table.addRow(event.name, "😎 SUCCESSFULL");
  });
  console.log(Table.toString());
};
