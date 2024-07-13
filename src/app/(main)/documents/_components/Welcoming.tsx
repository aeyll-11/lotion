import EditNickname from "./EditNickname";

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
    <div className="flex flex-col sm:flex-row justify-center items-center text-3xl font-semibold py-10">
      <Welcome />
      &nbsp;
      <EditNickname />
    </div>
  )
}