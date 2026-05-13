import reactLogo from '../../assets/react.svg'

export default function ReactLogoHero() {
  return (
    <section className="playground-hero">
      <img
        src={reactLogo}
        alt="React logo"
        className="playground-hero__logo"
        width={256}
        height={256}
      />
    </section>
  )
}
