// DEK360 Ghana - News Data
const DEK360_DATA = {
  channel: {
    name: "DEK360 Ghana",
    handle: "@DEK360GHANA",
    channelId: "UCRJ2_AM0BGRR3X7QbkjRBWA",
    subscribers: "173K",
    description: "Immerse yourself in Ghana's vibrant culture, rich traditions, and irresistible cuisine. Discover hidden gems, exciting events, and fascinating stories."
  },

  categories: [
    "Politics",
    "National",
    "International",
    "Regulation",
    "Business",
    "Finance",
    "Health",
    "Technology",
    "Jobs",
    "Media",
    "Administration",
    "Defense",
    "Energy",
    "Culture",
    "Kids",
    "Sports",
    "Entertainment"
  ],

  articles: [
    // POLITICS
    {
      id: "p1",
      slug: "mahama-state-of-nation-address-2026",
      category: "Politics",
      title: "President Mahama Delivers 2026 State of the Nation Address to Parliament",
      headline: "President John Mahama delivers his highly anticipated State of the Nation Address, outlining economic recovery plans and key government priorities for 2026.",
      body: `President John Dramani Mahama delivered the 2026 State of the Nation Address to a packed Parliament on Thursday, laying out his administration's agenda for the year and highlighting key milestones in Ghana's economic recovery journey.

In a confident and detailed address, Mahama touched on the government's plans for infrastructure development, youth employment, healthcare accessibility, and the ongoing fight against corruption. He cited improvements in the services sector and a stabilizing cedi as early victories under his administration.

"Ghana is on the path to recovery, and I am committed to ensuring that every Ghanaian feels the positive impact of our policies," Mahama said to applause from the NDC side of the house.

The President also addressed the rising cost of living, promising targeted social interventions including expanded school feeding programmes, free healthcare for the elderly, and subsidies for smallholder farmers.

Opposition MPs were less impressed, with the NPP minority staging brief walkouts over certain claims made by the President. NPP Minority Leader Alexander Afenyo-Markin later told journalists that the address was "full of promises with no concrete action plan."

Despite the political theatre, analysts largely praised the address as ambitious and forward-looking. Political commentator Prof. Kwame Asante said it represented a clear break from the fiscal recklessness of the previous administration.

The address set the tone for what promises to be a busy legislative year, with major bills on banking reform, local governance, and digital infrastructure expected to hit the floor of Parliament in the coming months.`,
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&q=80",
      author: "DEK360 Politics Desk",
      date: "February 18, 2026",
      readTime: "5 min read",
      views: "14.2K",
      shares: "3.1K",
      featured: true,
      tag: "STATE OF NATION"
    },
    {
      id: "p2",
      slug: "ghana-burkina-faso-security-agreements",
      category: "Politics",
      title: "Ghana and Burkina Faso Sign Seven Key Security Agreements to Combat Terrorism",
      headline: "Ghana and Burkina Faso have signed seven bilateral agreements and adopted a joint security framework aimed at fighting terrorism in the sub-region.",
      body: `Ghana and Burkina Faso have taken a significant step in regional security cooperation, signing seven bilateral agreements including a new joint security framework aimed at combating terrorism in West Africa.

The agreements were signed at a high-level summit in Accra, attended by top government officials and security chiefs from both nations. The framework focuses on intelligence sharing, joint border patrols, and coordinated counter-terrorism operations.

"This is not just a bilateral agreement — it is a statement to the world that West Africa will not be a safe haven for terrorists," Ghana's Interior Minister stated at the signing ceremony.

Burkina Faso, which has been gravely affected by Jihadist insurgencies in recent years, welcomed the agreements as a lifeline. The country's security officials noted that cross-border terrorists often exploit the porous Ghana-Burkina border.

The seven agreements cover military cooperation, police intelligence sharing, customs and border control, humanitarian corridors for displaced persons, joint economic zones, cultural exchange programs, and a shared early-warning system for security threats.

Security analysts applauded the move, though some cautioned that implementation would be the real test. "Agreements are only as strong as the political will behind them," said Dr. Ama Brew, a security expert at the University of Ghana.

The framework is expected to take effect immediately, with joint operations beginning within 30 days of the signing.`,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      author: "DEK360 News",
      date: "February 15, 2026",
      readTime: "4 min read",
      views: "8.7K",
      shares: "1.8K",
      featured: true,
      tag: "SECURITY"
    },
    {
      id: "p3",
      slug: "npp-internal-restructuring",
      category: "Politics",
      title: "NPP Begins Internal Restructuring After General Election Defeat",
      headline: "The NPP is undertaking a major internal review and restructuring exercise following its defeat in the 2024 general elections.",
      body: `The New Patriotic Party (NPP) has commenced a comprehensive internal restructuring exercise following its defeat in the 2024 general elections. The party's national executives say the process is necessary to rebuild trust with the Ghanaian electorate and position the NPP for a comeback.

A special committee has been set up to review the party's campaign strategies, communication failures, and candidate selection processes. The committee, headed by former Energy Minister Dr. Opoku Prempeh, is expected to submit its report by April 2026.

Among the issues being examined are the party's handling of economic hardship under the Akufo-Addo administration, particularly the E-Levy controversy, debt management, and the breakdown of the cocoa economy.

"We must be honest with ourselves. We made mistakes, and we owe it to our members and Ghanaians to acknowledge them and fix them," said NPP General Secretary Justin Kodua.

Grassroots members across the country have called for sweeping changes including term limits for national executives and a more transparent parliamentary candidate selection process.

The restructuring is also expected to address youth disillusionment within the party, after thousands of young NPP supporters reportedly stayed home on election day.

The party plans to hold a special congress later in the year to ratify new internal regulations and elect interim leadership to guide the rebuilding process.`,
      image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=400&q=80",
      author: "DEK360 Politics Desk",
      date: "February 10, 2026",
      readTime: "4 min read",
      views: "6.3K",
      shares: "1.2K",
      featured: false,
      tag: "NPP"
    },

    // NATIONAL
    {
      id: "n1",
      slug: "baby-theft-hospital-security",
      category: "National",
      title: "Wave of Baby Theft Cases Sparks Urgent Call for Enhanced Hospital Security",
      headline: "A series of baby theft incidents at Ghanaian hospitals has prompted health authorities to call for urgent security upgrades across maternity wards nationwide.",
      body: `A troubling wave of baby theft incidents at hospitals across Ghana has prompted health authorities, security agencies, and hospital administrators to convene an emergency meeting to address glaring security gaps in maternal and neonatal wards.

At least four incidents have been recorded in the past two months, with three babies successfully recovered and one still missing. The incidents have sent shockwaves through families expecting children and raised serious questions about safety in public health facilities.

The Ghana Health Service (GHS) has directed all government hospitals and clinics to conduct immediate security audits. A new directive requires hospitals to install CCTV cameras in all maternity wards and implement a wristband tagging system for newborns within 72 hours of birth.

"This is unacceptable. A mother should never have to worry about her newborn's safety while in a hospital. We are treating this with the urgency it deserves," said Dr. Lydia Dsane-Selby, Director-General of the GHS.

The Ghana Police Service has set up a dedicated task force to handle baby theft cases. The task force has made two arrests so far, with suspects facing charges under the Criminal and Other Offences Act.

Hospital workers' unions have called for additional personnel to monitor wards, arguing that understaffing is a root cause of the security lapses. They have requested that the Ministry of Health fast-track recruitment.

Parents and civil society groups have demanded public accountability and have launched a social media campaign, #ProtectOurBabies, to pressure authorities into taking swift action.`,
      image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=80",
      author: "DEK360 National Desk",
      date: "February 19, 2026",
      readTime: "5 min read",
      views: "19.4K",
      shares: "7.6K",
      featured: true,
      tag: "SECURITY"
    },
    {
      id: "n2",
      slug: "ghana-passport-50-countries-visa-free",
      category: "National",
      title: "Ghanaian Passport Holders Can Now Travel to 50 Countries Visa-Free",
      headline: "Ghana's passport has gained ground internationally, with holders now enjoying visa-free or visa-on-arrival access to 50 countries around the world.",
      body: `Ghanaian passport holders can now travel to 50 countries across the globe without requiring a prior visa, according to a new ranking released by the Henley Passport Index. This marks a significant improvement from the previous year's standing.

The countries on the visa-free list include several African Union member states, Caribbean nations, and some Southeast Asian countries. Notable additions this year include Malaysia, Maldives, and Kenya, following recent diplomatic agreements.

The Ministry of Foreign Affairs celebrated the development as a diplomatic achievement, noting that the government has been actively negotiating bilateral visa exemption agreements with key partner nations.

"We are committed to making the Ghanaian passport one of the most respected travel documents in Africa," said Foreign Minister Shirley Ayorkor Botchwey.

However, travel experts cautioned that visa-on-arrival arrangements still require fees and documentation at the point of entry, and travelers should thoroughly research requirements before departure.

The Henley Index, which ranks 199 passports globally, places Ghana at 79th position, up four places from the previous year. Top-ranked passports like those of Singapore, Japan, and France offer access to over 190 countries.

Travel agencies in Accra noted a spike in inquiries following the announcement, with many Ghanaians excited about expanded travel possibilities for business, tourism, and education.`,
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80",
      author: "DEK360 News",
      date: "February 14, 2026",
      readTime: "3 min read",
      views: "22.1K",
      shares: "9.4K",
      featured: true,
      tag: "TRANSFER"
    },
    {
      id: "n3",
      slug: "accra-flooding-drains-degsilting",
      category: "National",
      title: "Accra Metropolitan Assembly Begins Mass Desilting of Drains Ahead of Rainy Season",
      headline: "The AMA has launched a city-wide drain desilting exercise to prevent the perennial flooding that plagues Accra during the rainy season.",
      body: `The Accra Metropolitan Assembly (AMA) has launched an extensive drain desilting and cleaning exercise across the nation's capital in anticipation of the upcoming rainy season. The initiative, dubbed "Operation Clean Drain," aims to clear over 300 kilometres of drains across Accra's 10 sub-metros.

Mayor of Accra, Elizabeth Sackey, personally led the launch ceremony at Kwame Nkrumah Circle, one of the city's most flood-prone areas. She emphasized that this year's exercise would be the most comprehensive in recent memory, involving both heavy machinery and community volunteers.

"Flooding is not inevitable. With proper coordination and community commitment, we can significantly reduce the annual disaster that Accra experiences during the rains," Mayor Sackey declared.

The AMA has contracted four companies for the mechanical desilting of major water channels while community-based organizations have been enlisted to handle smaller drains and neighborhood gutters.

The exercise will also target illegal structures built on water channels, with the AMA vowing to demolish any obstacle blocking natural water flow within the city.

Residents welcomed the initiative but expressed skepticism based on past failed promises. "Each year they come and clean, by July everything is flooded again. We hope this time is different," said Emmanuel Quaynor, a trader at Kaneshie Market.

The rainy season in Accra typically begins in April and peaks in June. The AMA has set March 15 as the deadline for completing the major desilting works.`,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      author: "DEK360 National Desk",
      date: "February 12, 2026",
      readTime: "4 min read",
      views: "7.8K",
      shares: "2.3K",
      featured: false,
      tag: "ACCRA"
    },

    // INTERNATIONAL
    {
      id: "i1",
      slug: "uk-prisoner-deportation-ghana-escape",
      category: "International",
      title: "Ghanaian Prisoner Set for UK Deportation Escapes Police Custody at Airport",
      headline: "A Ghanaian national facing deportation from the United Kingdom managed to escape from police custody at London's Heathrow Airport, sparking a diplomatic incident.",
      body: `A Ghanaian national facing deportation from the United Kingdom escaped from police custody at London's Heathrow Airport in a dramatic incident that has sparked a diplomatic review between the two nations.

The man, identified only as Kwame D., 34, exploited a brief lapse in supervision as officers prepared to escort him onto a Ghana-bound flight. He allegedly broke free in a transit corridor and disappeared into the terminal before armed response units could respond.

British authorities launched an immediate manhunt and placed Heathrow on elevated alert. As of press time, the individual had not been apprehended. UK Home Secretary Yvette Cooper described the incident as "deeply embarrassing" and ordered an immediate review of deportation protocols.

Ghana's Foreign Ministry expressed concern and pledged full cooperation with British authorities in locating the individual. The ministry confirmed that the man had been serving a custodial sentence for drug trafficking before being processed for deportation.

The incident has reignited debate in the UK about its immigration and deportation framework, with human rights groups arguing that the conditions of deportation flights are inhumane, while government critics say the escape underscores failures in the deportation system.

This is the second high-profile deportation escape to occur at a UK airport in 18 months, following a similar incident involving a Nigerian national in 2024.

Ghanaian authorities say they have placed relevant entry points on alert should the individual attempt to return home via other routes.`,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80",
      author: "DEK360 International Desk",
      date: "February 16, 2026",
      readTime: "4 min read",
      views: "11.3K",
      shares: "4.2K",
      featured: false,
      tag: "UK"
    },
    {
      id: "i2",
      slug: "us-visa-warning-ghana-world-cup",
      category: "International",
      title: "US Embassy Warns Ghanaian World Cup Fans Against Overstaying Visas",
      headline: "The US Embassy in Accra has issued a stern warning to Ghanaians planning to attend the 2026 FIFA World Cup to return home after the tournament ends.",
      body: `The United States Embassy in Accra has issued a formal warning to Ghanaian football fans planning to attend the 2026 FIFA World Cup, cautioning them against overstaying their US visas once the tournament concludes.

The World Cup is scheduled to be co-hosted by the United States, Canada, and Mexico from June to July 2026, making it a major draw for football fans worldwide, including thousands of Ghanaians eager to support the Black Stars.

In a public advisory, the Embassy stated: "We encourage Ghanaians to attend and enjoy the World Cup. However, we want to make it very clear — your visa is tied to the tournament period. Overstaying is a federal offense with serious consequences, including a permanent ban on future US visa applications."

The warning comes amid growing concerns that some travelers may use the World Cup as an opportunity to remain in the US illegally. Similar advisories were issued ahead of the 2022 Qatar World Cup.

US immigration authorities have announced enhanced monitoring at airports and land border crossings during and after the tournament. Airlines have been instructed to report any passengers who fail to board return flights.

The Ghanaian government has urged its citizens to comply with the terms of their visas and leverage the World Cup as an opportunity to showcase Ghana's positive image internationally.

Travel agents in Ghana have reported a massive surge in visa applications and World Cup travel package inquiries, with some packages reportedly selling out weeks in advance.`,
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&q=80",
      author: "DEK360 International Desk",
      date: "February 11, 2026",
      readTime: "4 min read",
      views: "15.6K",
      shares: "6.2K",
      featured: false,
      tag: "WORLD CUP 2026"
    },

    // BUSINESS
    {
      id: "b1",
      slug: "customs-tax-evasion-85-million",
      category: "Business",
      title: "Customs Officials Intercept Trucks in GH¢85M Tax Evasion Scheme",
      headline: "Ghana Revenue Authority officers have intercepted multiple articulated trucks suspected of massive tax evasion worth over GH¢85 million at various checkpoints.",
      body: `Ghana Revenue Authority (GRA) customs officials have intercepted several articulated trucks at various entry points and checkpoints across the country, foiling what authorities describe as a sophisticated tax evasion network with over GH¢85 million in unpaid taxes at stake.

The operation, codenamed "Operation Clearway," was conducted simultaneously across three major entry points: Tema Port, Aflao Border, and Paga Border over a 72-hour period. GRA officials, supported by the Ghana Police Service and Ghana Armed Forces, stopped a total of 23 trucks.

GRA Commissioner-General Rev. Ammishaddai Owusu-Amoah said the intercepted goods included electronics, textiles, household appliances, and food items — all carrying falsified import documentation designed to undervalue the shipments and minimize duty payments.

"These criminals think they can cheat the state with impunity. We are sending a clear message — the Ghana Revenue Authority is watching, and we will catch those who steal from Ghana," Owusu-Amoah declared at a press conference.

Nine individuals have been arrested in connection with the operation, including three customs clearing agents accused of facilitating the fraudulent documentation. They are facing charges of tax fraud and conspiracy.

The incident highlights ongoing challenges with under-invoicing at Ghana's ports, a practice that the GRA estimates costs the country billions of cedis annually. The authority is currently implementing AI-based scanning technology at Tema Port to detect discrepancies in cargo declarations.

The Importers and Exporters Association of Ghana condemned the fraud but called for the GRA to distinguish between genuine errors in documentation and deliberate evasion.`,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80",
      author: "DEK360 Business Desk",
      date: "February 17, 2026",
      readTime: "5 min read",
      views: "9.1K",
      shares: "2.9K",
      featured: false,
      tag: "GRA"
    },
    {
      id: "b2",
      slug: "ghana-services-sector-growth",
      category: "Business",
      title: "Ghana's Services Sector Drives Economic Growth as Recovery Gains Momentum",
      headline: "Ghana's services sector recorded significant growth in Q4 2025, emerging as the primary driver of the country's economic recovery.",
      body: `Ghana's services sector has emerged as the primary engine of economic growth in the fourth quarter of 2025, according to data released by the Ghana Statistical Service (GSS). The sector, which includes finance, telecommunications, trade, and transportation, recorded a growth rate of 6.8% — the fastest expansion in three years.

The data shows that the financial services sub-sector led growth at 9.2%, boosted by a surge in mobile money transactions and increased lending by commercial banks following the central bank's decision to lower its key policy rate. The telecoms sub-sector also performed strongly at 7.4%, driven by data services.

GSS Director-General Dr. Baah Wadieh attributed the recovery to improved investor confidence, stable foreign exchange rates, and government spending on public services.

"The services sector's performance suggests that the broader economy is turning a corner. We expect this momentum to continue into 2026 as structural reforms take effect," Dr. Wadieh said.

The agriculture and industry sectors, however, delivered mixed results. Agricultural output contracted slightly due to erratic rainfall patterns in the Upper East and Volta regions, while industrial output grew modestly at 2.3%.

Economists at the University of Ghana's Business School projected overall GDP growth of around 4.5% for 2025, a significant improvement from the near-recession conditions of 2023 and early 2024.

The IMF, which has been closely monitoring Ghana's performance under its Extended Credit Facility program, said the growth figures were "broadly in line with projections" and expressed cautious optimism about the country's fiscal trajectory.`,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80",
      author: "DEK360 Business Desk",
      date: "February 8, 2026",
      readTime: "5 min read",
      views: "6.5K",
      shares: "1.7K",
      featured: false,
      tag: "ECONOMY"
    },

    // FINANCE
    {
      id: "f1",
      slug: "ghana-scholarship-secretariat-278-beneficiaries",
      category: "Finance",
      title: "Ghana Scholarship Secretariat Releases List of 278 New Beneficiaries",
      headline: "The Ghana Scholarship Secretariat has published the names of 278 students who will benefit from government-funded scholarships for overseas studies.",
      body: `The Ghana Scholarship Secretariat (GSS) has released the names of 278 students selected to benefit from government scholarships for undergraduate and postgraduate studies abroad. The announcement brings relief to hundreds of applicants who had been anxiously waiting since submitting their applications last year.

The beneficiaries, drawn from across the country's 16 regions, will pursue studies in fields including medicine, engineering, agriculture, law, public administration, and the arts. Their studies will be funded in universities in the United Kingdom, Canada, the United States, China, Germany, and other partner countries.

Secretariat Executive Secretary Dr. Samuel Afotey Odai said selection was based on academic merit, regional equity, and national development priorities.

"We have made a deliberate effort this year to ensure that students from underrepresented regions, particularly the Northern and Savannah regions, are meaningfully included," Dr. Odai stated.

Twenty of the 278 scholarships have been allocated for students with disabilities, following advocacy by disability rights groups who criticized the Secretariat's past record on inclusion.

The list faced controversy with allegations of political favoritism surfacing on social media. The Secretariat dismissed the claims, inviting any aggrieved applicants to submit official complaints for review.

Selected beneficiaries are expected to report to the Secretariat's offices in Accra between March 1-15 for orientation, document verification, and briefing on scholarship conditions, including a mandatory return-to-serve requirement.`,
      image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80",
      author: "DEK360 Finance Desk",
      date: "February 13, 2026",
      readTime: "4 min read",
      views: "12.8K",
      shares: "5.4K",
      featured: false,
      tag: "SCHOLARSHIP"
    },
    {
      id: "f2",
      slug: "ofori-atta-interpol-red-notice-removed",
      category: "Finance",
      title: "INTERPOL Commission Orders Removal of Ken Ofori-Atta From Red Notice List",
      headline: "The Commission for the Control of INTERPOL Files has ordered Ken Ofori-Atta's removal from the INTERPOL Red Notice list, a major development in Ghana's financial crimes saga.",
      body: `The Commission for the Control of INTERPOL's Files (CCF) has ordered the removal of former Finance Minister Ken Ofori-Atta from INTERPOL's Red Notice list, in a significant legal development that has sent shockwaves through Ghana's political and financial landscape.

The CCF, which acts as the independent oversight body for INTERPOL's records, said in a statement that the Red Notice against Ofori-Atta did not comply with INTERPOL's rules and regulations. The commission ordered the immediate deletion of the notice from INTERPOL's records.

Ofori-Atta's legal team expressed delight at the ruling, calling it a "vindication" of their long-standing argument that the notice was politically motivated. Lead defense attorney Kissi Agyebeng said: "This confirms what we have always maintained — that the former minister has been subjected to targeted persecution disguised as legal process."

The Ghana Attorney-General's department said it was reviewing the CCF's ruling and would consult with its INTERPOL liaison about next steps. The government had been relying on the Red Notice as a key tool in its ongoing prosecution of Ofori-Atta on charges related to financial misappropriation and breach of public trust during his tenure as Finance Minister.

Civil society groups reacted with disappointment, arguing that the ruling should not be seen as exoneration. "INTERPOL Red Notices and domestic prosecution are separate matters. The local case must proceed on its own merits," said anti-corruption activist Edem Senanu.

Ofori-Atta, who has been living outside Ghana, has not publicly commented on the development.`,
      image: "https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?w=400&q=80",
      author: "DEK360 Finance Desk",
      date: "February 9, 2026",
      readTime: "5 min read",
      views: "17.3K",
      shares: "8.1K",
      featured: false,
      tag: "INTERPOL"
    },

    // HEALTH
    {
      id: "h1",
      slug: "meningitis-outbreak-northern-ghana",
      category: "Health",
      title: "Health Authorities Respond to Meningitis Outbreak in Northern Ghana",
      headline: "Ghana Health Service has dispatched rapid response teams to the Northern Region following a spike in meningitis cases.",
      body: `Ghana Health Service has deployed rapid response teams to the Northern Region following a concerning spike in reported meningitis cases in several communities. Health authorities confirmed that at least 47 cases and 8 deaths have been recorded in the past three weeks.

The outbreak, primarily affecting the Kumbungu and Tolon districts, has prompted the GHS to declare a public health emergency in the affected areas. Emergency vaccination campaigns are already underway, with over 12,000 doses of meningococcal vaccine administered in the past week.

"We are doing everything in our power to contain this outbreak. Our teams are on the ground, and we are working round the clock," said Deputy Director-General of the GHS, Dr. Kofi Asante.

The World Health Organization (WHO) Ghana office has commended the swift response and pledged to provide additional medical supplies and technical support. An emergency shipment of 50,000 vaccine doses is expected from Geneva within 72 hours.

Schools in the affected districts have been temporarily closed as a precautionary measure, and public gatherings have been restricted. Health workers have been going from home to home to screen residents for symptoms.

Meningitis is characterized by fever, severe headache, stiff neck, and sensitivity to light. Authorities urged anyone experiencing these symptoms to report immediately to the nearest health facility without delay.

Community leaders in the Northern Region have been instrumental in spreading health information and encouraging residents to get vaccinated. The GHS expects to have the outbreak under control within two weeks.`,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
      author: "DEK360 Health Desk",
      date: "February 20, 2026",
      readTime: "4 min read",
      views: "24.5K",
      shares: "11.2K",
      featured: false,
      tag: "HEALTH ALERT"
    },

    // TECHNOLOGY
    {
      id: "t1",
      slug: "ghana-digital-address-system-expansion",
      category: "Technology",
      title: "Ghana Post's Digital Address System to Cover All Districts by Mid-2026",
      headline: "Ghana Post has announced plans to extend its GhanaPostGPS digital address coverage to every district capital across the country by June 2026.",
      body: `Ghana Post has announced an ambitious plan to extend its GhanaPostGPS digital address system to cover all district capitals and major communities by June 2026. The initiative is part of the government's broader digital transformation agenda.

The GhanaPostGPS system, which assigns a unique 6-character code to every 5x5 meter location in Ghana, currently covers major cities and urban centers. The new phase will extend coverage to rural and peri-urban communities, with a particular focus on district capitals in the Northern, Upper East, Upper West, and Bono regions.

Minister for Communications and Digitalisation Samuel Nartey George said the expansion would enable formal addresses for millions of Ghanaians who currently rely on informal location descriptions like "near the church" or "after the roundabout."

"A digital address is a foundation for e-commerce, healthcare delivery, emergency response, and financial inclusion. Every Ghanaian deserves one," the minister said.

The postal authority plans to work with community leaders and local government authorities to register homes and businesses, deploying a team of over 500 field agents equipped with GPS-enabled tablets.

E-commerce businesses in Ghana have strongly welcomed the news, citing addressing challenges as a major obstacle to last-mile delivery. Jumia Ghana CEO Juliet Ankomah said the expansion would be "transformative" for online retail.

The GhanaPostGPS app has been downloaded over 3 million times since its 2019 launch and has been recognized internationally as a pioneering solution to Africa's addressing challenge.`,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
      author: "DEK360 Tech Desk",
      date: "February 7, 2026",
      readTime: "4 min read",
      views: "8.9K",
      shares: "3.1K",
      featured: false,
      tag: "DIGITAL"
    },

    // SPORTS
    {
      id: "s1",
      slug: "semenyo-manchester-city-transfer",
      category: "Sports",
      title: "Semenyo Completes Stunning Move to Manchester City from Bournemouth",
      headline: "Ghanaian international Antoine Semenyo has completed a high-profile transfer to Premier League giants Manchester City from Bournemouth.",
      body: `Ghanaian international winger Antoine Semenyo has completed a blockbuster transfer to Manchester City from Bournemouth in a deal reportedly worth £65 million, cementing his status as one of West Africa's most exciting football exports.

The 25-year-old, who has been in scintillating form for Bournemouth this season, passed his medical at Manchester City's training complex on Thursday and has signed a five-year contract with the Premier League champions.

Semenyo was unveiled to jubilant fans at the Etihad Stadium and expressed his delight at joining one of the world's most successful clubs. "This is a dream come true. Manchester City is one of the best teams in the world, and I am determined to make my mark here," Semenyo said.

Back in Ghana, the news was greeted with enormous pride and celebrations. Former Black Stars captain Asamoah Gyan described it as a historic moment for Ghanaian football. "This shows the world that Ghanaian players belong at the very top," Gyan said.

The Black Stars head coach Otto Addo congratulated Semenyo and expressed hope that the move would elevate the player's performance on the international stage. Ghana is midway through its 2026 FIFA World Cup qualifying campaign.

Manchester City manager Pep Guardiola described Semenyo as "a complete winger" with the pace, skill, and work ethic to thrive in his system. He is expected to provide competition for wide roles alongside Savinho and Doku.

Bournemouth, meanwhile, will reinvest the transfer fee, with reports suggesting the club is close to signing a replacement from LaLiga.`,
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80",
      author: "DEK360 Sports Desk",
      date: "February 18, 2026",
      readTime: "4 min read",
      views: "41.2K",
      shares: "18.7K",
      featured: true,
      tag: "TRANSFER"
    },
    {
      id: "s2",
      slug: "black-stars-world-cup-qualifier",
      category: "Sports",
      title: "Black Stars Gear Up for Crucial World Cup Qualifier Against Nigeria",
      headline: "Ghana's Black Stars are in intensive preparations for a make-or-break FIFA World Cup qualifier against Nigeria at the Accra Sports Stadium.",
      body: `Ghana's Black Stars are intensifying preparations for their highly anticipated FIFA 2026 World Cup qualifier against Nigeria, scheduled for the Accra Sports Stadium on March 5, 2026. The match carries enormous stakes for both West African giants.

Ghana currently sits second in Group D, three points behind leaders Senegal, with Nigeria in third place. A win for the Black Stars would put them in a strong position to qualify for their fourth World Cup, while a defeat could deal a serious blow to Ghana's chances.

Head coach Otto Addo has called up a 26-man squad that includes the likes of Thomas Partey, Jordan Ayew, Mohammed Salisu, and the in-form Semenyo, who is enjoying a high-profile debut at Manchester City.

"We respect Nigeria but we have no reason to fear them. We are playing at home, in Accra, in front of our passionate fans. We are ready," Addo told journalists at a pre-match press conference at the GFA secretariat.

Ticket sales for the match have been brisk, with the 40,000-capacity Accra Sports Stadium expected to be a sell-out. The Ghana Football Association has urged fans to maintain good order and create the kind of atmosphere that inspires the team.

The match is scheduled for 4:00 PM local time and will be broadcast live on Ghana Television (GTV) and SuperSport. The Black Stars last faced Nigeria in a controversial World Cup playoff in 2022 that Ghana won on away goals.

Nigerian coach Gernot Rohr has warned that his team will approach the match with full determination, having named a strong squad including Arsenal's Saka and Everton's Iheanacho.`,
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&q=80",
      author: "DEK360 Sports Desk",
      date: "February 21, 2026",
      readTime: "5 min read",
      views: "28.9K",
      shares: "12.4K",
      featured: false,
      tag: "WORLD CUP"
    },

    // ENTERTAINMENT / MEDIA
    {
      id: "e1",
      slug: "stonebwoy-bhim-fest-2025",
      category: "Entertainment",
      title: "Stonebwoy Storms Accra Sports Stadium in Spectacular BHIM Fest Concerts",
      headline: "Reggae/Dancehall superstar Stonebwoy delivered an electrifying performance at the BHIM Fest concert, cementing his status as Ghana's biggest live act.",
      body: `Reggae and Dancehall superstar Stonebwoy delivered what fans and critics are calling the greatest concert performance in Ghana's modern entertainment history as BHIM Fest returned to the Accra Sports Stadium to a capacity crowd of over 40,000 ecstatic fans.

Dressed in a white ensemble, Stonebwoy made a dramatic entrance via a specially rigged crane that lowered him onto the massive stage amid fireworks and pyrotechnics that lit up the Accra night sky. The crowd's roar could reportedly be heard kilometers away.

Over three hours, the Bhim Nation president performed hits spanning his entire discography — from early anthems like "Baafira" and "Enku Lenu" to recent smash hits and collaborations with international artists. Several surprise guests joined him on stage, including Sarkodie, King Promise, and Jamaican dancehall artist Popcaan.

"Accra, you have proven once again why you are the heartbeat of Africa's entertainment," Stonebwoy said, visibly emotional as the crowd chanted his name.

Event production was on a global scale, featuring a 360-degree LED screen setup, laser shows, and live band arrangements. Professional concert organizers from the UK were reportedly brought in to manage the technical aspects.

BHIM Fest was sold out weeks in advance, with tickets ranging from GH¢500 for general admission to GH¢10,000 for VIP experiences. The concert attracted diaspora Ghanaians from the UK, USA, and Germany.

Music industry insiders say BHIM Fest has now set the standard for concert production in Africa and expect Stonebwoy to announce an African arena tour later this year.`,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
      author: "DEK360 Entertainment Desk",
      date: "February 5, 2026",
      readTime: "5 min read",
      views: "35.7K",
      shares: "14.8K",
      featured: true,
      tag: "CONCERT"
    },
    {
      id: "e2",
      slug: "made-in-taadi-samini-sarkodie",
      category: "Entertainment",
      title: "Made in Taadi Goes Wild as Samini, Sarkodie, and Top Acts Storm Takoradi",
      headline: "The Made in Taadi music festival transformed Takoradi into a festival city as Ghanaian music icons Samini and Sarkodie headlined a stunning night of music.",
      body: `The coastal city of Takoradi experienced an unforgettable night of music as the Made in Taadi festival brought together some of Ghana's biggest music acts for a spectacular celebration of western regional culture and music.

Headlined by reggae/dancehall legend Samini and hip-hop icon Sarkodie, the festival drew an estimated crowd of 25,000 to the Takoradi Sports Stadium. Support acts included Medikal, Quamina MP, who hails from Takoradi, and upcoming western regional talent.

The night was particularly emotional for Samini, who is from Takoradi and told the crowd it was "always special" to perform at home. "This city made me. Every time I come back, I am reminded of who I am and where I come from," he said as fans sang along to every word.

Sarkodie, making a rare western regional appearance, treated fans to a 90-minute set that included his greatest hits and recently released chart-toppers. He dedicated a verse of his performance to the youth of the Western Region, many of whom he said inspired his work.

Medikal brought the house down with his signature high energy performance, while Quamina MP generated arguably the loudest reaction of the night when he walked on stage, with the hometown crowd deafening in its reception.

The festival also featured a food and craft market showcasing local cuisine and artisanal products, as well as a Takoradi cultural heritage exhibition.

Takoradi's mayor described the festival as a major economic boost to the city, with hotels fully booked and local businesses reporting record sales over the festival weekend.`,
      image: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=400&q=80",
      author: "DEK360 Entertainment Desk",
      date: "February 3, 2026",
      readTime: "4 min read",
      views: "21.4K",
      shares: "9.3K",
      featured: false,
      tag: "MUSIC"
    },

    // CULTURE
    {
      id: "c1",
      slug: "otumfuo-visits-police-headquarters",
      category: "Culture",
      title: "Asantehene Otumfuo Visits Police Headquarters in Historic First Visit",
      headline: "Asantehene Otumfuo Osei Tutu II made a historic first-ever visit to the Ghana Police Service headquarters, where he was received by top police commanders.",
      body: `In what has been described as a historic moment, Asantehene Otumfuo Osei Tutu II paid his first-ever official visit to the Ghana Police Service headquarters in Accra, strengthening the bond between traditional authority and state institutions.

The Asantehene, accompanied by senior palace officials and Asanteman traditional leaders, was received by Inspector-General of Police Dr. George Akuffo Dampare and senior police commanders. The occasion was marked by traditional protocols blended with formal military honours.

After a closed-door meeting with police leadership, Otumfuo addressed officers gathered at the parade ground, urging them to uphold the rule of law and maintain the trust of Ghanaians.

"A nation's security forces are the pillar of its peace. What you do every day — protecting lives and property — is noble work. I urge you to do it with integrity and purpose," the Asantehene said to a standing ovation.

The IGP presented Otumfuo with a specially commissioned award recognizing his contributions to peace and security in the Ashanti Region, particularly his role in mediating chieftaincy disputes and community conflicts that would otherwise have required police intervention.

The visit came weeks after police received a special commendation from the Asantehene for their professional conduct during a major festival in Kumasi. The IGP described the Asantehene's visit as "one of the most gratifying moments" in his career.

Traditional and modern authorities have increasingly been collaborating in Ghana on matters of security, community development, and social harmony.`,
      image: "https://images.unsplash.com/photo-1509099652299-30938b0aeb63?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1509099652299-30938b0aeb63?w=400&q=80",
      author: "DEK360 Culture Desk",
      date: "February 6, 2026",
      readTime: "4 min read",
      views: "16.8K",
      shares: "7.2K",
      featured: false,
      tag: "TRADITION"
    },

    // DEFENSE
    {
      id: "d1",
      slug: "armed-robbery-taxi-driver-hero",
      category: "Defense",
      title: "Taxi Driver Hailed as Hero After Putting Life at Risk to Stop Armed Robbery",
      headline: "A Accra taxi driver is being celebrated across Ghana after he single-handedly intervened to stop an armed robbery, risking his own life to protect victims.",
      body: `A taxi driver in Accra has become a national hero after he used his vehicle to ram a getaway motorcycle carrying two armed robbers who had just snatched a mobile phone and cash from a woman on a busy street in Dzorwulu.

The driver, named Kwesi Boateng, 38, noticed the robbery in his rearview mirror and made a split-second decision to cut off the fleeing robbers. He drove his taxi into the path of the motorcycle, causing it to crash into the curb and throwing both occupants to the ground.

One robber suffered a broken arm and was immediately apprehended by bystanders who joined in after seeing what had happened. The second managed to escape on foot but was caught later that evening by the Ghana Police Dzorwulu Divisional Command.

The robbery victim, a nurse identified as Abena Sarpong, recovered her belongings and tearfully thanked Boateng on camera. The video went viral within hours, garnering over two million views on social media.

Boateng himself, however, has since expressed regret at his actions. "I did it instinctively, but my taxi is now damaged and I have no insurance for this kind of thing. I am happy she got her things back but I am also worried about how I will fix my car," he said.

The story prompted a nationwide debate on the responsibilities of citizens during crime incidents and the risks of vigilante intervention. It also triggered a fundraising campaign on social media, with Ghanaians raising over GH¢35,000 to repair Boateng's taxi and reward his bravery.

The Ghana Police Service commended Boateng's courage but advised citizens to prioritize their safety and report crimes rather than intervening physically.`,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=80",
      author: "DEK360 News",
      date: "February 16, 2026",
      readTime: "4 min read",
      views: "31.5K",
      shares: "13.9K",
      featured: false,
      tag: "BRAVERY"
    },

    // MEDIA
    {
      id: "m1",
      slug: "mcbrown-marriage-prophecy-controversy",
      category: "Media",
      title: "'I Knew McBrown's Marriage Would Collapse' — Prophet's Viral Prediction Stirs Controversy",
      headline: "A prophet's claim that he predicted Nana Ama McBrown's marriage breakdown has gone viral, igniting fierce debate about ecclesiastical ethics and celebrity privacy.",
      body: `A Ghanaian prophet has sparked nationwide controversy after claiming in a widely-circulated interview that he had privately prophesied the breakdown of actress and TV personality Nana Ama McBrown's marriage years before it became public knowledge.

The prophet, who appeared on a local television programme, also offered unsolicited commentary on NPP's decline saying "Nana Addo Is NPP's Downfall" and praised the NDC's reconnection with ordinary Ghanaians under President Mahama, mixing political commentary with celebrity prophecy in a manner that drew enormous criticism.

McBrown, one of Ghana's most beloved entertainers, has not officially confirmed the status of her marriage to Maxwell Mensah, though Ghanaian media has been awash with reports of trouble in their relationship for several months.

The video of the prophet's interview spread rapidly on social media, accumulating millions of views within 48 hours. Reactions were polarized — many found his comments disrespectful and an invasion of privacy, while others in religious circles argued that prophets had a divine mandate to speak truth.

"This is irresponsible and exploitative. Celebrity gossip dressed up as prophecy is not ministry," wrote media commentator Kafui Dey on his Twitter/X page.

Several prominent pastors responded publicly, calling on the religious community to maintain ethical boundaries around the personal lives of public figures.

McBrown's management team released a brief statement saying the actress "remains focused on her children, her career, and her wellbeing" and thanked fans for their "overwhelming love and support during a personal period."

The Ghana Media Commission has begun looking into whether the broadcast violated guidelines on privacy and dignity.`,
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80",
      author: "DEK360 Media Desk",
      date: "February 20, 2026",
      readTime: "5 min read",
      views: "38.6K",
      shares: "16.3K",
      featured: false,
      tag: "CELEBRITY"
    },

    // JOBS
    {
      id: "j1",
      slug: "ghana-recruitment-drive-health-workers",
      category: "Jobs",
      title: "Health Ministry Announces Emergency Recruitment of 3,000 Health Workers Nationwide",
      headline: "Ghana's Ministry of Health has announced an emergency recruitment drive for over 3,000 health workers to address critical staffing shortages in hospitals across the country.",
      body: `Ghana's Ministry of Health has announced an emergency recruitment exercise that will add over 3,000 new health workers to the country's public health system over the next six months, addressing what the minister described as a "critical and dangerous" staffing shortage.

The recruitment will span nurses, midwives, community health officers, laboratory scientists, pharmacists, and doctors, with a particular focus on deploying personnel to underserved districts in the three Northern regions, the Oti Region, and the Western North Region.

Health Minister Kwabena Mintah Akandoh made the announcement at a press conference in Accra, saying the recruitment had been fast-tracked following alarming reports from regional health directorates about patient-to-staff ratios that fall well below the World Health Organization's recommended minimum.

"We cannot speak of quality healthcare if our facilities don't have the human resources to deliver it. This recruitment is an emergency response," Minister Akandoh stated.

The Ghana Registered Nurses and Midwives Association (GRNMA) welcomed the announcement but expressed concern about delays in previous recruitments, urging the ministry to ensure the process was transparently managed.

Applications will be open on the Ministry of Health's official website (www.moh.gov.gh) from March 1, with shortlisting expected by April 15. Applicants must be registered with the relevant professional bodies and willing to work in any part of the country.

The Ministry has promised competitive salaries and a new rural health incentive package for workers posted to remote communities, including housing support and a rural premium on top of standard base pay.`,
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&q=80",
      author: "DEK360 Jobs Desk",
      date: "February 21, 2026",
      readTime: "4 min read",
      views: "13.7K",
      shares: "6.8K",
      featured: false,
      tag: "RECRUITMENT"
    },

    // ENERGY
    {
      id: "en1",
      slug: "ghana-solar-energy-expansion-northern",
      category: "Energy",
      title: "Ghana Launches Largest Solar Energy Project in Northern Region",
      headline: "The government has commissioned Ghana's largest solar energy installation in the Northern Region, adding 100MW of clean energy to the national grid.",
      body: `The Government of Ghana has commissioned what officials describe as the country's largest solar energy installation, a 100-megawatt photovoltaic power plant located in the Tolon District of the Northern Region, marking a major milestone in Ghana's renewable energy journey.

The plant, developed in partnership with Chinese renewable energy company Sinohydro and with funding from the African Development Bank, will add 100MW of clean, sustainable electricity to the national grid — enough to power approximately 200,000 Ghanaian homes.

President Mahama attended the commissioning ceremony and described the plant as "a statement of intent" about his government's commitment to clean energy and energy security.

"Ghana must not choose between power and its future. Solar energy gives us both — reliable electricity and a sustainable planet," the President declared.

The Electricity Company of Ghana (ECG) said the addition would significantly reduce the load on thermal plants and help minimize load shedding, particularly in the Northern Region which has historically experienced more frequent outages than the south.

The 100MW plant covers approximately 250 acres of land previously used for low-intensity farming. Farmers displaced from the land have been resettled and given priority in jobs created by the plant.

Environmentalists largely praised the development but called for clearer regulations on land use for solar installations and a national framework for community benefit sharing from large-scale renewable energy projects.

The government has set a target of 10% renewable energy in Ghana's electricity mix by 2030, up from the current approximately 1.5%.`,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80",
      author: "DEK360 Energy Desk",
      date: "February 17, 2026",
      readTime: "5 min read",
      views: "9.4K",
      shares: "3.6K",
      featured: false,
      tag: "RENEWABLE"
    }
  ],

  // YouTube videos from DEK360Ghana channel
  trendingVideos: [
    {
      id: "v1",
      videoId: "2qGAbRbhZ7s",
      title: "I Knew McBrown's Marriage Would Collapse 🔥 Nana Addo Is NPP's Downfall",
      description: "Prophet makes shocking revelations about McBrown's marriage and NDC vs NPP politics",
      category: "Media",
      views: "2.4M",
      duration: "18:42"
    },
    {
      id: "v2",
      videoId: "_NSOv6h5DHo",
      title: "Famous Female Tanker Driver In Accra — Driving Trucks & Excavators For 10 Years",
      description: "Meet the remarkable woman breaking barriers in Ghana's transport industry",
      category: "National",
      views: "1.1M",
      duration: "12:35"
    },
    {
      id: "v3",
      videoId: "Sei3S8w37CI",
      title: "Taxi Driver Put His Life At Risk To Stop An Armed Robbery ‼️",
      description: "Brave taxi driver intervenes in robbery, then regrets it for a heartfelt reason",
      category: "National",
      views: "3.2M",
      duration: "15:08"
    },
    {
      id: "v4",
      videoId: "iw__sqnswhg",
      title: "The Most Expensive Dog 🐕 in Accra 🇬🇭 Finally Found — It's 6,000 Cedis",
      description: "We tracked down the most expensive dog in Ghana's capital city",
      category: "Culture",
      views: "890K",
      duration: "10:22"
    },
    {
      id: "v5",
      videoId: "mnh-NHz9Aik",
      title: "Oheneba Ntim Barima Sends Warning After Akosua Serwaa Gone Back To Germany",
      description: "Traditional leader reacts to viral controversy involving Akosua Serwaa",
      category: "Culture",
      views: "1.7M",
      duration: "20:14"
    },
    {
      id: "v6",
      videoId: "lQ_-ihkCVY4",
      title: "I Have Helped 1,000s of People Travel to USA — I Schooled In Russia & Taught in America",
      description: "Mr. Offei shares his remarkable story of facilitating US travel for Ghanaians",
      category: "International",
      views: "1.3M",
      duration: "24:51"
    },
    {
      id: "v7",
      videoId: "mBPyDBCt5wg",
      title: "Ghana Police Gives Asantehene A Special Prize in Private Meeting with Commanders",
      description: "Historic moment as police commanders honour the Asantehene",
      category: "National",
      views: "2.1M",
      duration: "16:30"
    },
    {
      id: "v8",
      videoId: "xOBZr_zAUvI",
      title: "Asantehene Gives a Strong Warning To Ghana Police After Visiting Them",
      description: "Otumfuo speaks powerfully to police officers on integrity and duty",
      category: "Culture",
      views: "2.8M",
      duration: "19:45"
    },
    {
      id: "v9",
      videoId: "Nr8ncyqHeoc",
      title: "Otumfou Visits Police Head-Quarters For The First Time 🔥",
      description: "Appiah Stadium and Seidu react to the historical visit",
      category: "Culture",
      views: "1.9M",
      duration: "22:17"
    },
    {
      id: "v10",
      videoId: "5oZhLnP5HDo",
      title: "You Won't Believe This Entrance! Stonebwoy Storms Accra Sports Stadium | BHIM Fest",
      description: "Stonebwoy's incredible stage entrance at BHIM Fest broke the internet",
      category: "Entertainment",
      views: "4.5M",
      duration: "8:33"
    },
    {
      id: "v11",
      videoId: "7A2S7vN2myM",
      title: "Made In Taadi Goes Wild — Samini, Sarkodie, Medikal Storm Takoradi",
      description: "Top acts from the Made in Taadi festival in Takoradi",
      category: "Entertainment",
      views: "2.6M",
      duration: "31:20"
    },
    {
      id: "v12",
      videoId: "nHs8gS8cgzc",
      title: "From Mahama To Ken? Prophet Elbernard Reveals New Prophetic Message At Ken's Praise 2026",
      description: "Shocking prophetic revelations at the Ken's Praise 2026 event",
      category: "Media",
      views: "1.4M",
      duration: "13:58"
    }
  ],

  // Mock Polls data
  pools: [
    {
      id: "poll1",
      question: "Who do you think will win the 2028 General Elections?",
      totalVotes: 15420,
      options: [
        { label: "NPP", votes: 6200, color: "var(--accent-blue)" },
        { label: "NDC", votes: 7500, color: "var(--accent-red)" },
        { label: "Other", votes: 1720, color: "var(--text-muted)" }
      ]
    },
    {
      id: "poll2",
      question: "Will the Black Stars qualify for the 2026 World Cup?",
      totalVotes: 32100,
      options: [
        { label: "Yes, definitely", votes: 24500, color: "var(--success)" },
        { label: "No, they won't", votes: 5200, color: "var(--danger)" },
        { label: "Not sure yet", votes: 2400, color: "var(--warning)" }
      ]
    },
    {
      id: "poll3",
      question: "What is the biggest issue facing Ghana today?",
      totalVotes: 8900,
      options: [
        { label: "Economy & Inflation", votes: 4100, color: "var(--accent-red)" },
        { label: "Unemployment", votes: 2800, color: "var(--accent-blue)" },
        { label: "Corruption", votes: 1500, color: "var(--text-primary)" },
        { label: "Infrastructure", votes: 500, color: "var(--text-muted)" }
      ]
    }
  ]
};

// Helper functions
function getArticlesByCategory(category) {
  return DEK360_DATA.articles.filter(a => a.category === category);
}

function getArticleBySlug(slug) {
  return DEK360_DATA.articles.find(a => a.slug === slug);
}

function getFeaturedArticles() {
  return DEK360_DATA.articles.filter(a => a.featured);
}

function getRelatedArticles(category, currentSlug, limit = 3) {
  return DEK360_DATA.articles
    .filter(a => a.category === category && a.slug !== currentSlug)
    .slice(0, limit);
}

function getAllArticles(limit = null) {
  if (limit) return DEK360_DATA.articles.slice(0, limit);
  return DEK360_DATA.articles;
}
