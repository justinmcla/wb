# Generates random number of floors and rooms for Facility
def create_floors_and_rooms facility
  size = rand 1..10
  i    = 0
  while i < size
    facility.floors.create number: i
    i += 1
  end
  facility.floors.each do |f|
    size = rand 10
    i    = 0
    while i < size
      f.rooms.create name: "Room #{i}", facility: facility
      i += 1
    end
  end
end

# Generates sample address for Facility
def create_facility_address facility
  a = {
    line_1: "#{rand 100} #{%w(Main Second Oak Elm Michigan Third).sample} #{%w(St Dr Ave Pl Rd).sample}",
    city: "#{%w(Denver Chicago Missoula Atlanta Sacramento).sample}",
    zip: "#{rand 10000..99999}"
  }

  a[:line_2] = "Suite #{rand 100}" if [true, false].sample

  case a[:city]
  when 'Denver' then a[:state] = 'CO'
  when 'Chicago' then a[:state] = 'IL'
  when 'Missoula' then a[:state] = 'MT'
  when 'Atlanta' then a[:state] = 'GA'
  when 'Sacramento' then a[:state] = 'CA'
  end
  facility.create_address a
end

# Add seed facilities to below array
# Facility name must be unique to be created
FACILITIES = [
  { name: 'Central Park', private: false },
  { name: 'New York City Public Library', private: false },
  { name: 'Radio City Music Hall', private: true },
  { name: 'Empire State Building', private: true },
  { name: 'Town Center', private: false },
  { name: 'MacArthur Center', private: true },
  { name: 'Town Point Park', private: false },
  { name: 'Ted Constant Convocation Center', private: true },
  { name: 'City Square', private: false },
  { name: 'The NorVA', private: true }
]

# Iterates over FACILITIES array and creates facilities that aren't found in the database
FACILITIES.each { |f| Facility.create f unless Facility.find_by(name: f[:name]) }

# Creates floors, rooms, and addresses for facilities unless those attributes already exist
Facility.all.each do |f|
  create_floors_and_rooms f unless f.floors.count > 0
  create_facility_address f unless f.address != nil
end
