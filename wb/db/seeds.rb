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

# Samples for address generation
# If cities are added to array, be sure to update create_facility_address
# to appropriately assign state based on sampled city name
STREET_NAMES   = %w(Main Second Oak Elm Michigan Third)
STREET_ENDINGS = %w(St Dr Ave Pl Rd)
CITIES         = %w(Denver Chicago Missoula Atlanta Sacramento)

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
    line_1: "#{rand 100} #{STREET_NAMES.sample} #{STREET_ENDINGS.sample}",
    city: "#{CITIES.sample}",
    zip: "#{rand 10000..99999}"
  }

  a[:line_2] = "Suite #{rand 100}" if [true, false].sample

  a[:state] = case a[:city]
              when 'Denver'     then 'CO'
              when 'Chicago'    then 'IL'
              when 'Missoula'   then 'MT'
              when 'Atlanta'    then 'GA'
              when 'Sacramento' then 'CA'
              end

  facility.create_address a
end

# Possible disciplines for Work Orders
DISCIPLINES = %w(Carpentry Electrical Grounds Housekeeping
  HVAC Moving Plumbing Other)

# Generates sample work order
def create_work_order room
  opts = {
    discipline:   DISCIPLINES.sample,
    description:  'This is a test.',
    facility:     room.facility,
    room:         room
  }
  WorkOrder.create opts
end

# Iterates over FACILITIES array and creates facilities that aren't found in the database
FACILITIES.each { |f| Facility.create f unless Facility.find_by(name: f[:name]) }

# Creates floors, rooms, and addresses for facilities unless those attributes already exist
Facility.all.each do |f|
  create_floors_and_rooms f unless f.floors.count > 0
  create_facility_address f unless f.address != nil
end

# Creates an AID for each room to be used as a default facility code.
Room.all.each { |r| r.update aid: SecureRandom.hex(4) unless r.aid }

# Creates a work order for each room
Room.all.each { |r| create_work_order r }
