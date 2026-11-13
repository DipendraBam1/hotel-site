import { useState } from 'react';
import Async from '../Async';
import { formatMoney } from '../format';
import { validateRate } from '../rules';

function RoomRow({ room, onSave }) {
  const [draft, setDraft] = useState(String(room.pricePerNight));
  const [onSale, setOnSale] = useState(room.onSale);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | saving | saved | failed

  const dirty = draft !== String(room.pricePerNight) || onSale !== room.onSale;
  const errorId = `${room.id}-rate-error`;

  async function handleSave() {
    const message = validateRate(draft);
    if (message) {
      setError(message);
      setStatus('idle');
      return;
    }
    setStatus('saving');
    try {
      await onSave(room.id, { pricePerNight: draft, onSale });
      setStatus('saved');
    } catch (err) {
      if (err.errors?.pricePerNight) {
        setError(err.errors.pricePerNight);
        setStatus('idle');
      } else {
        setStatus('failed');
      }
    }
  }

  return (
    <tr className="align-top">
      <th scope="row" className="p-4 font-display text-xl font-medium">
        {room.name}
        <span className="mt-1 block font-sans text-xs font-normal text-stone">
          Current rate: {formatMoney(room.pricePerNight)}
        </span>
      </th>
      <td className="p-4">{room.capacity}</td>
      <td className="p-4">
        <input
          type="text"
          inputMode="numeric"
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            setError('');
            setStatus('idle');
          }}
          aria-label={`Rate per night in pounds for ${room.name}`}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`h-11 w-28 bg-white px-3 ${
            error ? 'border-2 border-red-800' : 'border border-stone'
          }`}
        />
        {error && (
          <p id={errorId} className="mt-2 max-w-[16rem] text-red-800">
            <span className="font-medium">Error: </span>
            {error}
          </p>
        )}
      </td>
      <td className="p-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={onSale}
            onChange={(e) => {
              setOnSale(e.target.checked);
              setStatus('idle');
            }}
            className="h-5 w-5 accent-navy"
          />
          {onSale ? 'On sale' : 'Off sale'}
          <span className="sr-only"> for {room.name}</span>
        </label>
      </td>
      <td className="p-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={!dirty || status === 'saving'}
          className="h-11 border border-navy px-5 tracking-wider text-navy hover:bg-navy hover:text-ivory disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-navy"
        >
          Save<span className="sr-only"> {room.name}</span>
        </button>
        <p aria-live="polite" className="mt-2 text-stone">
          {status === 'saving' && 'Saving…'}
          {status === 'saved' && 'Saved (demo)'}
          {status === 'failed' && 'Could not save. Try again.'}
        </p>
      </td>
    </tr>
  );
}

export default function Rooms({ rooms, saveRoom }) {
  return (
    <>
      <p className="text-xs uppercase tracking-[0.14em] text-brass">Inventory</p>
      <h1 className="mt-3 text-4xl md:text-5xl">Rooms and rates</h1>
      <p className="mt-4 max-w-[60ch] text-stone">
        Change a nightly rate or take a room type off sale. Press Save to apply a change.
      </p>

      <Async resource={rooms}>
        {(list) => (
          <div className="mt-8 overflow-x-auto border border-stone-light bg-white">
            <table className="w-full min-w-[44rem] text-left text-sm">
              <caption className="sr-only">Room rates and sale status (demonstration)</caption>
              <thead className="border-b border-stone-light text-xs uppercase tracking-[0.12em] text-stone">
                <tr>
                  <th scope="col" className="p-4 font-normal">Room</th>
                  <th scope="col" className="p-4 font-normal">Sleeps</th>
                  <th scope="col" className="p-4 font-normal">Rate per night (£)</th>
                  <th scope="col" className="p-4 font-normal">Status</th>
                  <th scope="col" className="p-4 font-normal">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-light">
                {list.map((room) => (
                  <RoomRow key={room.id} room={room} onSave={saveRoom} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Async>
    </>
  );
}