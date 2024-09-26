const hospitaldata = [
    {
      "id": 1,
      "name": "Green Valley Hospital",
      "speciality": "Cardiology",
      "address": "123 Wellness Street, Health City",
      "contact": "+123 456 7890",
      "timings": "8:00 AM - 5:00 PM",
      "totalBeds": 150,
      "totalPersonsPerSlot": 30,
      "timeSlots": ["8:00 AM - 9:00 AM", "10:00 AM - 11:00 AM", "2:00 PM - 3:00 PM"],
      "url": [
        "https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      "status":"pending"
    },
    {
      "id": 2,
      "name": "Sunrise Medical Center",
      "speciality": "Orthopedics",
      "address": "456 Sun Avenue, Caretown",
      "contact": "+123 987 6543",
      "timings": "9:00 AM - 6:00 PM",
      "totalBeds": 200,
      "totalPersonsPerSlot": 40,
      "timeSlots": ["9:00 AM - 10:00 AM", "11:00 AM - 12:00 PM", "3:00 PM - 4:00 PM"],
      "url": [
        "https://img.freepik.com/premium-photo/advanced-healthcare-facility-with-red-cross-clean-medical-environment_976564-9836.jpg?size=626&ext=jpg&ga=GA1.1.799426814.1712308866&semt=ais_hybrid",
        "https://img.freepik.com/premium-photo/hospital-illustration-icon-cartoon-graphics_1070876-11215.jpg?size=626&ext=jpg&ga=GA1.1.799426814.1712308866&semt=ais_hybrid",
        "https://media.gettyimages.com/id/1312706413/photo/modern-hospital-building.jpg?s=612x612&w=0&k=20&c=oUILskmtaPiA711DP53DFhOUvE7pfdNeEK9CfyxlGio="
      ],
      "status":"pending"
    },
    {
      "id": 3,
      "name": "Riverdale Hospital",
      "speciality": "Pediatrics",
      "address": "789 River Road, Childcare City",
      "contact": "+123 567 8901",
      "timings": "24/7",
      "totalBeds": 300,
      "totalPersonsPerSlot": 50,
      "timeSlots": ["9:00 AM - 10:00 AM", "2:00 PM - 3:00 PM", "5:00 PM - 6:00 PM"],
      "url": [
        "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://media.gettyimages.com/id/1312706504/photo/modern-hospital-building.jpg?s=612x612&w=0&k=20&c=DT6YDRZMH5G5dL-Qv6VwPpVDpIDxJqkAY4Gg0ojGi58=",
        "https://media.gettyimages.com/id/1453876840/photo/hospital-sign.jpg?s=612x612&w=0&k=20&c=r1s1eCKhK4jprX4HodUDOZ32H_x5rK0xIASqTx1lwVs="
      ],
      "status":"pending"
    },
    {
      "id": 4,
      "name": "Grand Oak Hospital",
      "speciality": "Neurology",
      "address": "321 Oak Lane, Neuroville",
      "contact": "+123 678 1234",
      "timings": "10:00 AM - 4:00 PM",
      "totalBeds": 120,
      "totalPersonsPerSlot": 20,
      "timeSlots": ["10:00 AM - 11:00 AM", "12:00 PM - 1:00 PM", "2:00 PM - 3:00 PM"],
      "url": [
        "https://media.gettyimages.com/id/173799627/photo/study-of-architectural-form-05.jpg?s=612x612&w=0&k=20&c=rrHldo5akJRAeGjm_5ICkzZrTooEYLcww1BkMeCc7Y0=",
        "https://media.gettyimages.com/id/594828733/photo/illuminated-driveway-of-hospital-at-night.jpg?s=612x612&w=0&k=20&c=tmKyYKTbl0BPj8G8t480vPkGIEvsS858aDdION6Z2Y4=",
        "https://media.gettyimages.com/id/174901169/photo/office-building-with-landscaping.jpg?s=612x612&w=0&k=20&c=Jfh8xWZbHc-UGCf8PHMSIA8Vmw2Jfu7OfgpM89kodJw="
      ],
      "status":"pending"
    },
    {
      "id": 5,
      "name": "City Health Clinic",
      "speciality": "Dermatology",
      "address": "101 Main Boulevard, Skintown",
      "contact": "+123 890 5678",
      "timings": "8:00 AM - 3:00 PM",
      "totalBeds": 80,
      "totalPersonsPerSlot": 15,
      "timeSlots": ["8:00 AM - 9:00 AM", "11:00 AM - 12:00 PM", "1:00 PM - 2:00 PM"],
      "url": [
        "https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      "status":"pending"
    },
    {
      "id": 6,
      "name": "Mountainview Hospital",
      "speciality": "Oncology",
      "address": "789 Summit Street, Cancer Care City",
      "contact": "+123 234 5670",
      "timings": "7:00 AM - 8:00 PM",
      "totalBeds": 250,
      "totalPersonsPerSlot": 35,
      "timeSlots": ["7:00 AM - 8:00 AM", "12:00 PM - 1:00 PM", "5:00 PM - 6:00 PM"],
      "url": [
        "https://media.gettyimages.com/id/1312706413/photo/modern-hospital-building.jpg?s=612x612&w=0&k=20&c=oUILskmtaPiA711DP53DFhOUvE7pfdNeEK9CfyxlGio=",
        "https://img.freepik.com/premium-photo/advanced-healthcare-facility-with-red-cross-clean-medical-environment_976564-9836.jpg?size=626&ext=jpg&ga=GA1.1.799426814.1712308866&semt=ais_hybrid",
        "https://img.freepik.com/premium-photo/hospital-illustration-icon-cartoon-graphics_1070876-11215.jpg?size=626&ext=jpg&ga=GA1.1.799426814.1712308866&semt=ais_hybrid"
        
      ],
      "status":"approved"
    },
    {
      "id": 7,
      "name": "Central Hospital",
      "speciality": "General Surgery",
      "address": "654 Center Road, Medtown",
      "contact": "+123 876 5432",
      "timings": "6:00 AM - 8:00 PM",
      "totalBeds": 180,
      "totalPersonsPerSlot": 40,
      "timeSlots": ["6:00 AM - 7:00 AM", "9:00 AM - 10:00 AM", "4:00 PM - 5:00 PM"],
      "url": [
        "https://media.gettyimages.com/id/1312706504/photo/modern-hospital-building.jpg?s=612x612&w=0&k=20&c=DT6YDRZMH5G5dL-Qv6VwPpVDpIDxJqkAY4Gg0ojGi58=",
        "https://media.gettyimages.com/id/1453876840/photo/hospital-sign.jpg?s=612x612&w=0&k=20&c=r1s1eCKhK4jprX4HodUDOZ32H_x5rK0xIASqTx1lwVs=",
        "https://media.gettyimages.com/id/1452316636/photo/paramedics-taking-patient-on-stretcher-from-ambulance-to-hospital.jpg?s=612x612&w=0&k=20&c=4oJ_99AB6LfPR0BjMxVRbdnRaDohEUvt8nUG-HPBJOo="
      ],
      "status":"pending"
    },
    {
      "id": 8,
      "name": "Seaside Hospital",
      "speciality": "Ophthalmology",
      "address": "123 Coastal Drive, Vision Bay",
      "contact": "+123 345 6789",
      "timings": "9:00 AM - 5:00 PM",
      "totalBeds": 100,
      "totalPersonsPerSlot": 25,
      "timeSlots": ["9:00 AM - 10:00 AM", "12:00 PM - 1:00 PM", "3:00 PM - 4:00 PM"],
      "url": [
        "https://media.gettyimages.com/id/173799627/photo/study-of-architectural-form-05.jpg?s=612x612&w=0&k=20&c=rrHldo5akJRAeGjm_5ICkzZrTooEYLcww1BkMeCc7Y0=",
        "https://media.gettyimages.com/id/594828733/photo/illuminated-driveway-of-hospital-at-night.jpg?s=612x612&w=0&k=20&c=tmKyYKTbl0BPj8G8t480vPkGIEvsS858aDdION6Z2Y4=",
        "https://media.gettyimages.com/id/174901169/photo/office-building-with-landscaping.jpg?s=612x612&w=0&k=20&c=Jfh8xWZbHc-UGCf8PHMSIA8Vmw2Jfu7OfgpM89kodJw="
      ],
      "status":"disapproved"
    },
    {
      "id": 9,
      "name": "Westside Clinic",
      "speciality": "Gastroenterology",
      "address": "456 West Street, Stomach Town",
      "contact": "+123 678 9012",
      "timings": "8:00 AM - 6:00 PM",
      "totalBeds": 90,
      "totalPersonsPerSlot": 20,
      "timeSlots": ["8:00 AM - 9:00 AM", "1:00 PM - 2:00 PM", "4:00 PM - 5:00 PM"],
      "url": [
        "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=600",
        "https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=600"
      ],
      "status":"disapproved"
    },
    {
      "id": 10,
      "name": "Northland Medical Center",
      "speciality": "Endocrinology",
      "address": "789 Northway, Hormone City",
      "contact": "+123 789 0123",
      "timings": "9:00 AM - 4:00 PM",
      "totalBeds": 110,
      "totalPersonsPerSlot": 15,
      "timeSlots": ["9:00 AM - 10:00 AM", "12:00 PM - 1:00 PM", "3:00 PM - 4:00 PM"],
      "url": [
        "https://img.freepik.com/premium-photo/advanced-healthcare-facility-with-red-cross-clean-medical-environment_976564-9836.jpg?size=626&ext=jpg&ga=GA1.1.799426814.1712308866&semt=ais_hybrid",
        "https://img.freepik.com/premium-photo/hospital-illustration-icon-cartoon-graphics_1070876-11215.jpg?size=626&ext=jpg&ga=GA1.1.799426814.1712308866&semt=ais_hybrid",
        "https://media.gettyimages.com/id/1312706413/photo/modern-hospital-building.jpg?s=612x612&w=0&k=20&c=oUILskmtaPiA711DP53DFhOUvE7pfdNeEK9CfyxlGio="
      ],
      "status":"pending"
    },
    {
      "id": 11,
      "name": "Lakeside Hospital",
      "speciality": "Dermatology",
      "address": "321 Lake Road, Bladder City",
      "contact": "+123 890 1234",
      "timings": "7:00 AM - 5:00 PM",
      "totalBeds": 130,
      "totalPersonsPerSlot": 25,
      "timeSlots": ["7:00 AM - 8:00 AM", "10:00 AM - 11:00 AM", "3:00 PM - 4:00 PM"],
      "url": [
        "https://media.gettyimages.com/id/1312706504/photo/modern-hospital-building.jpg?s=612x612&w=0&k=20&c=DT6YDRZMH5G5dL-Qv6VwPpVDpIDxJqkAY4Gg0ojGi58=",
        "https://media.gettyimages.com/id/1453876840/photo/hospital-sign.jpg?s=612x612&w=0&k=20&c=r1s1eCKhK4jprX4HodUDOZ32H_x5rK0xIASqTx1lwVs=",
        "https://media.gettyimages.com/id/1452316636/photo/paramedics-taking-patient-on-stretcher-from-ambulance-to-hospital.jpg?s=612x612&w=0&k=20&c=4oJ_99AB6LfPR0BjMxVRbdnRaDohEUvt8nUG-HPBJOo="
      ],
      "status":"pending"
    },
    {
      "id": 12,
      "name": "Eastside Health Center",
      "speciality": "Orthopedics",
      "address": "654 East Road, Mindtown",
      "contact": "+123 901 2345",
      "timings": "8:00 AM - 6:00 PM",
      "totalBeds": 140,
      "totalPersonsPerSlot": 20,
      "timeSlots": ["8:00 AM - 9:00 AM", "11:00 AM - 12:00 PM", "2:00 PM - 3:00 PM"],
      "url": [
        "https://media.gettyimages.com/id/594828733/photo/illuminated-driveway-of-hospital-at-night.jpg?s=612x612&w=0&k=20&c=tmKyYKTbl0BPj8G8t480vPkGIEvsS858aDdION6Z2Y4=",
        "https://media.gettyimages.com/id/173799627/photo/study-of-architectural-form-05.jpg?s=612x612&w=0&k=20&c=rrHldo5akJRAeGjm_5ICkzZrTooEYLcww1BkMeCc7Y0=",
        
        "https://media.gettyimages.com/id/174901169/photo/office-building-with-landscaping.jpg?s=612x612&w=0&k=20&c=Jfh8xWZbHc-UGCf8PHMSIA8Vmw2Jfu7OfgpM89kodJw="
      ],
      "status":"pending"
    }
  ];
  
  export default hospitaldata;
  