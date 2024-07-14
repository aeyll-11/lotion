import EditNickname from './EditNickname';

function Welcome() {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return 'Good morning,';
  } else if (currentHour >= 12 && currentHour < 23) {
    return 'Good afternoon,';
  } else {
    return 'Good evening,';
  }
}

export default function Welcoming() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-3xl font-semibold sm:flex-row">
      <Welcome />
      &nbsp;
      <EditNickname />
    </div>
  );
}
