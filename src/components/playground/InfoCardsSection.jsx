import InfoCard from '../../InfoCard.jsx'

export default function InfoCardsSection() {
  return (
    <div className="playground-section--cards">
      <InfoCard
        title="Props in React"
        content="Props pass data from one component to another."
        author="Alice"
      />
      <InfoCard
        title="React Composition"
        content="Composition makes your components more reusable."
        author="Charlie"
      />
    </div>
  )
}
