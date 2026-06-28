const REGIONS = [
  { name: "Sydney CBD", suburbs: ["Sydney CBD", "Haymarket", "The Rocks", "Pyrmont", "Ultimo"] },
  {
    name: "Inner West",
    suburbs: ["Newtown", "Leichhardt", "Balmain", "Marrickville", "Annandale", "Glebe", "Erskineville", "Camperdown"],
  },
  {
    name: "Eastern Suburbs",
    suburbs: ["Bondi", "Bondi Junction", "Coogee", "Randwick", "Paddington", "Double Bay", "Woollahra", "Maroubra"],
  },
  {
    name: "North Shore",
    suburbs: ["Chatswood", "North Sydney", "Mosman", "Lane Cove", "Willoughby", "St Leonards", "Crows Nest"],
  },
  { name: "Western Sydney", suburbs: ["Penrith", "Blacktown", "Liverpool", "Fairfield", "Mount Druitt"] },
  { name: "South Sydney", suburbs: ["Hurstville", "Kogarah", "Rockdale", "Sutherland", "Cronulla"] },
  { name: "Parramatta", suburbs: ["Parramatta", "Westmead", "Harris Park", "Rydalmere"] },
  { name: "Northern Beaches", suburbs: ["Manly", "Dee Why", "Mona Vale", "Avalon", "Palm Beach"] },
  { name: "Hills District", suburbs: ["Castle Hill", "Baulkham Hills", "Kellyville", "Rouse Hill"] },
];

const TOTAL_SUBURBS = REGIONS.reduce((sum, region) => sum + region.suburbs.length, 0);

export default function AreasServed() {
  return (
    <section className="bg-white px-20 py-16">
      <div className="mx-auto max-w-[1280px] text-center">
        <div className="font-display mb-3 text-[13px] font-semibold tracking-[0.06em] text-[#AAA] uppercase">
          Proudly Serving
        </div>
        <h2 className="font-display mb-3 text-[32px] font-black text-[#111]">
          <span className="text-redro-red">{TOTAL_SUBURBS}+</span> Sydney Suburbs Covered
        </h2>
        <p className="mx-auto mb-12 max-w-[480px] text-[15px] text-[#888]">
          From the CBD to the Hills District — we clean across Greater Sydney.
        </p>

        <div className="grid grid-cols-3 gap-5 text-left">
          {REGIONS.map((region) => (
            <div key={region.name} className="rounded-[14px] border border-[#ECEAE8] bg-redro-cream p-6">
              <div className="font-display mb-3 text-sm font-bold tracking-[0.02em] text-redro-red">
                {region.name}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {region.suburbs.map((suburb) => (
                  <span
                    key={suburb}
                    className="rounded-full border border-[#E6E4E0] bg-white px-3 py-1 text-xs font-medium text-[#555]"
                  >
                    {suburb}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
