// States for US, Mexico, India
const states = {
    US: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"],
    Mexico: ["Ags.", "B.C.", "B.C.S.", "Camp.", "Chis.", "Chih.", "Coah.", "Col.", "CDMX", "Dgo.", "Gto.", "Gro.", "Hgo.", "Jal.", "Méx.", "Mich.", "Mor.", "Nay.", "N.L.", "Oax.", "Pue.", "Qro.", "Q.R.", "S.L.P.", "Sin.", "Son.", "Tab.", "Tamps.", "Tlax.", "Ver.", "Yuc.", "Zac."],
    India: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal" ],
  }
  
  // Provincecodes for Brazil, Canada
  const provinceCodes = {
    Brazil: ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"],
    Canada: ["AB", "BC", "MB", "NB", "NL", "NS", "ON", "PE", "QC", "SK"],
  };
  
  // Provinces for Brazil, Canada, Korea
  const provinces = {
    Brazil: ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"],
    Canada: ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"],
    Korea: [ "Busan", "Daegu", "Daejeon", "Gangwon", "Gwangju", "Gyeonggi", "Incheon", "Jeju", "North Chungcheong", "North Gyeongsang", "North Jeolla", "Sejong", "Seoul", "South Chungcheong", "South Gyeongsang", "South Jeolla", "Ulsan"],
  };

  // Prefectures for Japan
  const prefectures = {
    Japan: ["Aichi", "Akita", "Aomori", "Chiba", "Ehime", "Fukui", "Fukuoka", "Fukushima", "Gifu", "Gunma", "Hiroshima", "Hokkaido", "Hyōgo", "Ibaraki", "Ishikawa", "Iwate", "Kagawa", "Kagoshima", "Kanagawa", "Kochi", "Kumamoto", "Kyoto", "Mie", "Miyagi", "Miyazaki", "Nagano", "Nagasaki", "Nara", "Niigata", "Oita", "Okayama", "Okinawa", "Osaka", "Saga", "Saitama", "Shiga", "Shimane", "Shizuoka", "Tochigi", "Tokushima", "Tokyo", "Tottori", "Toyama", "Wakayama", "Yamagata", "Yamaguchi", "Yamanashi"]
  }

  // Province key for Brazil - used for labeling
  const BrazilProvinceCodeKey = {
    'Acre' : 'AC', 
    'Alagoas' : 'AL', 
    'Amapá' : 'AP', 
    'Amazonas' : 'AM', 
    'Bahia' : 'BA', 
    'Ceará' : 'CE', 
    'Distrito Federal' : 'DF', 
    'Espírito Santo' : 'ES', 
    'Goiás' : 'GO', 
    'Maranhão' : 'MA',
    'Mato Grosso' : 'MT', 
    'Mato Grosso do Sul' : 'MS', 
    'Minas Gerais' : 'MG', 
    'Pará' : 'PA', 
    'Paraíba' : 'PB', 
    'Paraná' : 'PR', 
    'Pernambuco' : 'PE', 
    'Piauí' : 'PI', 
    'Rio de Janeiro' : 'RJ', 
    'Rio Grande do Norte' : 'RN', 
    'Rio Grande do Sul' : 'RS', 
    'Rondônia' : 'RO', 
    'Roraima' : 'RR', 
    'Santa Catarina' : 'SC', 
    'São Paulo' : 'SP', 
    'Sergipe' : 'SE',  
    'Tocantins' : 'TO'
  }  


  // ProvinceCode key for Canada - used for labeling
  const CanadaProvinceCodeKey = [
    { value: 'AB', label: 'Alberta' },
    { value: 'BC', label: 'British Columbia' },
    { value: 'MB', label: 'Manitoba' },
    { value: 'NB', label: 'New Brunswick' },
    { value: 'NL', label: 'Newfoundland and Labrador' },
    { value: 'NT', label: 'Northwest Territories' },
    { value: 'NS', label: 'Nova Scotia' },
    { value: 'NU', label: 'Nunavut' },
    { value: 'ON', label: 'Ontario' },
    { value: 'PE', label: 'Prince Edward Island' },
    { value: 'QC', label: 'Quebec' },
    { value: 'SK', label: 'Saskatchewan' },
    { value: 'YT', label: 'Yukon' }
  ];

  // State code key for Mexico - used for labeling
  const MexicoStateCodeKey = [
    { value: 'Ags.', label: 'Aguascalientes'},
    { value: 'B.C.', label: 'Baja California'},
    { value: 'B.C.S.', label: 'Baja California Sur'},
    { value: 'Camp.', label: 'Campeche' },
    { value: 'Chis.', label: 'Chiapas' },
    { value: 'Chih.', label: 'Chihuahua' },
    { value: 'Coah.', label: 'Coahuila' },
    { value: 'Col.', label: 'Colima' },
    { value: 'CDMX', label: 'Mexico City' },
    { value: 'Dgo.', label: 'Durango' },
    { value: 'Gto.', label: 'Guanajuato' },
    { value: 'Gro.', label: 'Guerrero' },
    { value: 'Hgo.', label: 'Hidalgo' },
    { value: 'Jal.', label: 'Jalisco' },
    { value: 'Méx.', label: 'México' },
    { value: 'Mich.', label: 'Michoacán' },
    { value: 'Mor.', label: 'Morales' },
    { value: 'Nay.', label: 'Nayarit' },
    { value: 'N.L.', label: 'Nuevo León' },
    { value: 'Oax.', label: 'Oaxaca' },
    { value: 'Pue.', label: 'Puebla' },
    { value: 'Qro.', label: 'Querétaro' },
    { value: 'Q.R.', label: 'Quintana Roo' },
    { value: 'S.L.P.', label: 'San Luis Potosí' },
    { value: 'Sin.', label: 'Sinaloa' },
    { value: 'Son.', label: 'Sonora' },
    { value: 'Tab.', label: 'Tabasco' },
    { value: 'Tamps.', label: 'Tamaulipas' },
    { value: 'Tlax.', label: 'Tlaxcala' },
    { value: 'Ver.', label: 'Veracruz' },
    { value: 'Yuc.', label: 'Yucatán' },
    { value: 'Zac.', label: 'Zacatecas' }
  ]

  // State code key for US - used for labeling
  const UsStateCodeKey = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana'},
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusettes' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island'},
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
    { value: 'DC', label: 'District of Columbia' }
  ]

export {states, provinceCodes, provinces, BrazilProvinceCodeKey, CanadaProvinceCodeKey, MexicoStateCodeKey, UsStateCodeKey, prefectures };
