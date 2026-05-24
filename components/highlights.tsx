export function Highlights() {
  const highlights = [
    {
      icon: "🍽️",
      title: "Домашняя кухня",
      description: "Блинчики, вареники, пельмени — блюда как у мамы, приготовленные с любовью",
    },
    {
      icon: "🍷",
      title: "Wine & Grill",
      description: "Хорошее вино и настоящий гриль — сочетание, которое делает вечер незабываемым",
    },
    {
      icon: "⚡",
      title: "Быстро и вкусно",
      description: "Свежие блюда по доступным ценам от 40 до 95 MDL — для любого случая",
    },
  ]

  return (
    <section id="highlights" className="py-20 px-6 bg-white/[0.72] backdrop-blur-[2px]">
      <div className="max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
        {highlights.map((item, index) => (
          <div key={index} className="p-6">
            <span className="text-5xl block mb-4">{item.icon}</span>
            <h3 className="text-lg font-extrabold uppercase text-[#c0392b] mb-1">
              {item.title}
            </h3>
            <p className="opacity-65 text-sm leading-relaxed text-[#2c1a0e]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
