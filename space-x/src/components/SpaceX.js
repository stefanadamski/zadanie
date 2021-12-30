import React, {useState} from 'react';
import {useEffect} from "react";
import '../css/space_x.css';

const LAUNCHES_QUERY = `
  {
  launchesPast(limit: 10) {
    id
    mission_name
  }
}
`

